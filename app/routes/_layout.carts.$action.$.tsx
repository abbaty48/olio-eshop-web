import { add2Carts, optCart, remove4Carts, updateCart } from "~/modules/.servers/cart.crud";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authorize } from "~/modules/.servers/session/auth"
import { prismaDB } from "~/modules/.servers/db.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    return null
}

export async function action({ request, params }: ActionFunctionArgs) {
    const { id: customerId } = await authorize(request)
    const { cartId, action } = params
    const splat = params['*']

    try {
        const cart = await prismaDB.cart.findFirst({ where: { cartId }, include: { product: { select: { id: true, price: true } } } })

        switch (action) {
            case 'add': {
                if (splat && splat.split('/').length === 3) {
                    const slugs = splat.split('/')
                    const qty = slugs[0], price = slugs[1], productId = slugs[2]
                    const serializeCookie = await add2Carts(request, productId, customerId, Number(qty), Number(price))
                    if (serializeCookie) {
                        return Response.json({ success: true }, {
                            headers: { 'Set-Cookie': serializeCookie }
                        })
                    }
                    return { success: false }
                }
                return { success: false }
            }
            case 'remove': {
                if (cart) {
                    const serializeCookie = await remove4Carts(request, cart.cartId, cart.product?.id ?? '', customerId)
                    if (serializeCookie) {
                        return Response.json({ success: true }, {
                            headers: { 'Set-Cookie': serializeCookie }
                        })
                    }
                    return { success: false }
                }
                throw { success: false }
            }
            case 'update': {
                if (!splat || !(splat.split('/').length >= 2)) return { success: false }
                const split = splat.split('/')
                const cartId = split[0], qty = split[1], price = split[2]
                const cart = await prismaDB.cart.findFirst({ where: { cartId }, include: { product: { select: { id: true, price: true } } } })
                if (!cartId || !cart || !cart.product) throw { success: false }
                const serializeCookie = price ?
                    await updateCart(request, cartId, cart.productId, customerId, Number(qty), Number(price)) :
                    await updateCart(request, cartId, cart.productId, customerId, Number(qty));
                if (serializeCookie) {
                    return Response.json({ success: true }, {
                        headers: { 'Set-Cookie': serializeCookie }
                    })
                }
                return { success: false }
            }
            case 'optCart': {
                if (!splat || splat.split('/').length !== 2) return { success: false }
                const split = splat.split('/'), cartId = split[0], select = split[1];
                return Response.json({ success: true }, {
                    headers: { 'Set-Cookie': await optCart(cartId, JSON.parse(select), request) ?? '' }
                })
            }
            default: throw { success: true }
        }
    } catch (error) {
        return { success: false }
    }
}
