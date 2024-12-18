import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authorize } from "~/modules/.servers/session/auth";
import { prismaDB } from "~/modules/.servers/db.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    return null
}

export async function action({ request, params }: ActionFunctionArgs) {
    const { id: customerId } = await authorize(request)
    const { id: productId, action } = params;
    const fd = (await request.formData())
    const cartId = fd.get('cartId') as string
    if (!productId) return { success: false }
    const product = await prismaDB.product.findFirst({ where: { id: productId } })
    if (!product) return { success: false };
    switch (action) {
        case 'add2Cart': {
            try {
                await prismaDB.cart.upsert({
                    where: {
                        cartId_productId_customerId: {
                            cartId: '',
                            productId,
                            customerId
                        }
                    },
                    create: {
                        quantity: 1, subPrice: product.price * 1,
                        product: { connect: { id: productId } }, customer: { connect: { id: customerId } }
                    },
                    update: {}
                })
                return { success: true }
            } catch (error) {
                return { success: false }
            }
        }
        case 'remove4rmCart': {
            try {
                await prismaDB.cart.delete({
                    where: {
                        cartId_productId_customerId:
                            { cartId, productId, customerId }
                    }
                })
                return { success: true }
            } catch (error) {
                return { success: false }
            }
        }
        case 'upsertCart': {
            try {
                await prismaDB.cart.upsert({
                    where: { cartId_productId_customerId: { cartId, productId, customerId } },
                    create: {
                        productId,
                        customerId,
                        quantity: Number(fd.get('quantity')) ?? 1,
                        subPrice: Number(fd.get('subPrice') ?? product.price * Number(fd.get('quantity')) ?? 1),
                    },
                    update: {
                        quantity: Number(fd.get('quantity')) ?? 1,
                        subPrice: Number(fd.get('subPrice') ?? product.price * Number(fd.get('quantity')) ?? 1),
                    },
                })
                return { success: true }
            } catch (error) {
                return { success: false }
            }
        }
    }
    return { success: false }
}
