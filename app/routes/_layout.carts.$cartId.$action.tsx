import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { prismaDB } from "~/modules/.servers/db.server";
import { authorize } from "~/modules/.servers/session/auth"

export async function loader({ request, params }: LoaderFunctionArgs) {
    return null
}

export async function action({ request, params }: ActionFunctionArgs) {
    const { id: customerId } = await authorize(request)
    const { cartId, action } = params
    console.log(cartId, action)
    if (!cartId) return { success: false }
    const cart = await prismaDB.cart.findFirst({ where: { cartId }, include: { product: { select: { id: true, price: true } } } })
    console.log('CART: ', cart)
    if (!cart || !cart.product) return { success: false }
    // const product = await prismaDB.product.findFirst({ where: { id: productId } })
    // if (!product) return { suc
    // cess: false }
    const { quantity, subPrice, product: { id: productId, price } } = cart;
    switch (action) {
        case 'add2Cart': {
            try {
                await prismaDB.cart.upsert({
                    where: {
                        cartId_productId_customerId: {
                            cartId,
                            productId,
                            customerId
                        }
                    },
                    create: {
                        quantity: 1, subPrice: price * 1,
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
                await prismaDB.cart.delete({ where: { cartId_productId_customerId: { cartId, productId, customerId: customerId } } })
                return { success: true }
            } catch (error) {
                return { success: false }
            }
        }
    }
    return { success: false }
}
