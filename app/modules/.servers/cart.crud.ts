import { createCookie, LoaderFunctionArgs } from '@remix-run/node';
import { authenticator, authorize, getIdentity } from './session/auth';
import { TCheckoutCart, TShoppingCart } from '../types';
import { Prisma } from '@prisma/client';
import { prismaDB } from './db.server';

/* Cart Session */
export const { serialize: serializeShoppingCarts, parse: parseShoppingCarts, name: cartCookieName } = createCookie('__session_carts', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    secrets: [authenticator.sessionKey],
    secure: process.env.NODE_ENV === 'production',
})

/* CART CRUD */
const LIMIT = 2;

/* LOADER */
function loaderHelper(identityId: string, page: number, count: number, payload: TShoppingCart) {
    // recommended products
    const recommendedProducts = Promise.resolve(prismaDB.product.findMany({ take: 10, orderBy: { createdAt: 'desc' }, include: { Cart: { where: { customerId: { equals: identityId } }, select: { cartId: true } } } }))

    const hasPreviousData = page > 1;
    const hasNextData = page < Math.ceil(count / LIMIT)
    return { page, count, hasNextData, hasPreviousData, payload, recommendedProducts }
}

export async function loader({ request }: LoaderFunctionArgs) {
    const identity = await authorize(request)
    const page = Number(new URL(request.url).searchParams.get('page') ?? 1)

    const cartsCookie = await parseShoppingCarts(request.headers.get('Cookie')) as TShoppingCart | null
    if (cartsCookie) {
        const start_index = (page - 1) * LIMIT, end_index = start_index + LIMIT
        const payload: TShoppingCart = {
            ...cartsCookie,
            carts: cartsCookie.carts.reverse().slice(start_index, end_index),
        }

        return loaderHelper(identity.id, page, cartsCookie.totalInCarts, payload)
    } else {
        const where: Prisma.CartWhereInput = { customerId: identity?.id }
        const [count, carts] = await prismaDB.$transaction([
            // count
            prismaDB.cart.count({ where }),
            // payload
            prismaDB.cart.findMany({ where, skip: (page - 1) * LIMIT, take: LIMIT, orderBy: { addedOn: 'desc' }, include: { product: true } }),
        ])
        const serializeCookie = await shoppingCartCookie(request, carts.map(cart => ({ ...cart, selected: false })))
        request.headers.set('Set-Cookie', serializeCookie ?? '')
        return loaderHelper(identity.id, page, count, await parseShoppingCarts(serializeCookie ?? 'Cookies'))
    }
}

/* add a cart */
export async function add2Carts(request: Request, productId: string, customerId: string, quantity: number, subPrice: number) {
    if (!productId || !customerId) return undefined;
    const product = await prismaDB.product.findFirst({ where: { id: productId } })
    if (!product) return undefined;
    try {
        await prismaDB.cart.create({
            data: { quantity, subPrice, product: { connect: { id: productId } }, customer: { connect: { id: customerId } } },
        })
        return await shoppingCartCookie(request)
    } catch (error) {
        return undefined;
    }
}

/* Remove a cart */
export async function remove4Carts(request: Request, cartId: string, productId: string, customerId: string) {
    if (!cartId || !customerId) return undefined
    try {
        await prismaDB.cart.delete({
            where: { cartId_productId_customerId: { cartId, customerId, productId } }
        })
        return await shoppingCartCookie(request)
    } catch (error) {
        return undefined
    }
}

/* Add/Update cart */
export async function upsertCart(request: Request, cartId: string, productId: string, customerId: string, quantity: number, subPrice: number): Promise<String | undefined> {

    if (!cartId || !productId || !customerId) return undefined
    const product = await prismaDB.product.findFirst({ where: { id: productId } })
    if (!product) return undefined;

    try {
        await prismaDB.cart.upsert({
            where: { cartId_productId_customerId: { cartId, productId, customerId } },
            create: {
                productId,
                customerId,
                quantity: quantity || 1,
                subPrice: subPrice || product.price * quantity,
            },
            update: {
                quantity,
                subPrice,
            },
        })
        return await shoppingCartCookie(request)
    } catch (error) {
        return undefined
    }
}

/* Update a cart */
export async function updateCart(request: Request, cartId: string, productId: string, customerId: string, qty: number, subPrice?: number) {
    try {
        await prismaDB.cart.update({
            where: { cartId_productId_customerId: { cartId, productId, customerId } },
            data: (qty && subPrice) ? { quantity: qty, subPrice } :
                qty ? { quantity: qty } : subPrice ? ({ subPrice }) : {}
        })
        return await shoppingCartCookie(request)
    } catch (error) {
        return undefined
    }
}

/* Shopping Carts */
export async function shoppingCartCookie(request: Request, selectedCart?: TCheckoutCart[]) {
    const customerId = (await getIdentity(request))?.id;
    if (customerId) {
        let checkouts: TCheckoutCart[] = []
        let customerCarts = (await prismaDB.cart.findMany({
            where: { customerId },
            include: { product: true },
        })).map(cart => ({ ...cart, selected: false }))

        if (!selectedCart) {
            const shoppingCart = await parseShoppingCarts(request.headers.get('Cookie')) as TShoppingCart
            if (!shoppingCart || !shoppingCart.carts) {
                checkouts = customerCarts
            } else {
                checkouts = customerCarts.map(cart_1 => Object.assign(cart_1,
                    { ...shoppingCart.carts.find(cart_2 => cart_2.cartId === cart_1.cartId), quantity: cart_1.quantity, subPrice: cart_1.subPrice }))
            }
        } else {
            checkouts = selectedCart
        }

        return await serializeShoppingCarts({
            carts: checkouts,
            totalInCarts: checkouts.length,
            totalPriceInCarts: checkouts.reduce((sum, cart) => sum + cart.subPrice, 0),
            totalQuantityInCarts: checkouts.reduce((total, cart) => total + cart.quantity, 0),
            totalInCheckouts: checkouts.reduce((total, cart) => (cart.selected) ? total += 1 : total, 0),
            totalPriceInCheckouts: checkouts.reduce((sum, cart) => (cart.selected) ? sum += cart.subPrice : sum, 0),
            totalQuantityInCheckouts: checkouts.reduce((total, cart) => (cart.selected) ? total += cart.quantity : total, 0),
        })
    }
}

export async function optCart(cartId: string, isSelected: boolean, request: Request) {
    const checkouts = await parseShoppingCarts(request.headers.get('Cookie')) as TShoppingCart
    let selectedCarts = checkouts.carts.map(cart => cart.cartId === cartId ? ({ ...cart, selected: isSelected }) : cart);
    return shoppingCartCookie(request, selectedCarts)
}
