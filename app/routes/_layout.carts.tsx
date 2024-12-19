import { RecommendProducts, SkeletonRecommendProducts } from '~/components/recommendProducts';
import { memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { IoAddCircle, IoRemoveOutline } from 'react-icons/io5';
import { Await, Link, useFetcher } from '@remix-run/react';
import { TCart, TFetcher, TProduct } from '~/modules/types';
import { authorize } from '~/modules/.servers/session/auth';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { LoaderFunctionArgs } from '@remix-run/node';
import { CiCircleInfo, CiImageOff } from 'react-icons/ci';
import { prismaDB } from '~/modules/.servers/db.server'
import { Paginator } from '~/components/paginator';
import PageTitle from '../components/pageTitle';
import { ImSpinner2 } from 'react-icons/im';
import { Prisma } from '@prisma/client';

const LIMIT = 5;

export async function loader({ request }: LoaderFunctionArgs) {
    const identity = await authorize(request)
    const page = Number(new URL(request.url).searchParams.get('page') ?? 1)

    const where: Prisma.CartWhereInput = { customerId: identity?.id }
    const [count, payload] = await prismaDB.$transaction([
        // count
        prismaDB.cart.count({ where }),
        // payload
        prismaDB.cart.findMany({ where, skip: (page - 1) * LIMIT, take: LIMIT, orderBy: { addedOn: 'desc' }, include: { product: true } }),
    ])
    // recommended products
    const recommendedProducts = Promise.resolve(prismaDB.product.findMany({ take: 10, orderBy: { createdAt: 'desc' }, include: { Cart: { where: { customerId: identity?.id }, select: { cartId: true } } } }))

    const hasPreviousData = page > 1;
    const hasNextData = page < Math.ceil(count / LIMIT)
    return { page, count, hasNextData, hasPreviousData, payload, recommendedProducts }
}

export const Cart = memo(({ cartId, subPrice, quantity, addedOn, product }: TCart) => {
    const fetcher = useFetcher()
    const cartProcessing = fetcher.state !== 'idle'
    const cartDeleting = fetcher.formMethod === 'DELETE'
    const [{ price, qty }, set] = useState({ price: subPrice, qty: quantity })
    const onMutate = useCallback((qty: number) => {
        if (product) {
            set(() => ({
                qty: qty <= 1 ? 1 : qty,
                price: product.price * qty
            }))
        }
    }, [quantity, product])

    useEffect(() => { onMutate(quantity) }, [product])

    return (
        <article key={cartId} hidden={cartDeleting} className='bg-white md:max-h-[60vh]  relative'>
            {product ? (
                <div className='space-y-2 p-4'>
                    <p className='text-sm text-right'>Added On: {Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(addedOn))}</p>
                    <article className='flex flex-wrap flex-col justify-between relative'>
                        {cartProcessing && (<span className="absolute bottom-2 left-2 animate-spin"><ImSpinner2 className='stroke-primary' /></span>
                        )}
                        <figure className='flex-1 flex flex-wrap gap-3 items-center justify-between'>
                            <img src={`/features/${product.feature}`} alt={product.desc ?? product.tag}
                                className='w-[200px] h-[200px]' width={100} height={100} />
                            <figcaption>
                                <dl className='space-y-4'>
                                    <dt className='text-xl text-wrap whitespace-pre-wrap max-w-[30ch]'>
                                        <sup>({qty})</sup> {product.name} </dt>
                                    <dd className='primary text-3xl text-right font-thin'>{Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(price)}
                                        <p className='relative top-1 text-[2rem] text-orange-500'><sub><strong>unit {Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(product.price)}</strong> </sub></p>
                                    </dd>
                                </dl>
                            </figcaption>
                        </figure>
                        <fetcher.Form aria-label={`Manage the cart for ${product.name} by Increment or Decrement the quantity of the cart or remove a cart.`} className='flex items-center justify-end gap-2 p-2'>
                            <input type="hidden" name="quantity" value={qty} />
                            <input type="hidden" name="cartId" value={cartId} />
                            <button aria-label={'Increment 1 more quantity of cart.'}
                                onClick={() => onMutate(qty + 1)}
                                formAction={`/product/${product.id}/upsertCart`} formMethod='PUT' className='hover:motion-preset-pulse-sm active:motion-preset-compress'>
                                <IoAddCircle /></button>
                            <button aria-label='Decrement 1 more quantity of cart.'
                                disabled={qty <= 1} onClick={() => onMutate(qty - 1)}
                                formAction={`/product/${product.id}/upsertCart`} formMethod='PUT' className='disabled:pointer-events-none disabled:opacity-30 hover:motion-preset-pulse-sm active:motion-preset-compress'><IoRemoveOutline /></button>
                            <button
                                aria-label='Remove the cart from the carts list.'
                                formAction={`/product/${product.id}/remove4rmCart`}
                                formMethod='DELETE' className='hover:motion-preset-pulse-sm active:motion-preset-compress'><MdRemoveShoppingCart /></button>
                        </fetcher.Form>
                    </article>
                </div>
            ) : (
                <div className='space-y-2 p-4'>
                    <p className='text-sm text-right'>Added On: {Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(addedOn))}</p>
                    <div className='flex flex-wrap items-center gap-5'>
                        <div className='w-[100px] h-[100px] bg-gray-50 grid place-items-center'><CiImageOff /> </div>
                        <p className='font-thin text-2xl text-primary'>
                            Product not available. <br />
                            <small className='text-xs font-extrabold text-orange-400'>The product associated with this cart is currently not available in the store.</small>
                        </p>
                    </div>
                    <fetcher.Form className='flex items-center justify-end gap-2 p-2' aria-label='Remove the cart form the carts list'>
                        <button aria-label='Remove the cart from the carts list.' className='hover:motion-preset-pulse-sm active:motion-preset-compress'><MdRemoveShoppingCart /></button>
                    </fetcher.Form>
                </div>
            )
            }
        </article>
    )
})

type TLoaderPayloads = TFetcher<TCart[]> & {
    recommendedProducts: Promise<TProduct[]>
}
export default function () {
    const fetcher = useFetcher<TLoaderPayloads>()
    const [isFetching, setIsFetching] = useState(true)
    /* Load data initially */
    useEffect(() => void fetcher.load(location.pathname), [])
    /* Fetching state */
    useEffect(() => void setIsFetching(fetcher.state !== 'idle'), [fetcher.state])
    /*  */
    const rProducts = (products: TProduct[]) => useMemo(() => {
        return products.map(product => ({ ...product, cartId: product.Cart[0]?.cartId }))
    }, [])


    return (<article className={'relative min-h-screen space-y-10 flex flex-col justify-between gap-10'}>
        {isFetching && (
            <div className="absolute grid place-items-center inset-full top-0 right-0 bottom-0 left-0 bg-white/85 w-full motion-safe:animate-pulse overflow-hidden z-[5000]">
                <ImSpinner2 className="animate-spin size-20 fill-primary" />
            </div>
        )}

        {
            fetcher.data && fetcher.data.count ?
                (
                    <article className="md:px-8 px-2 py-8 space-y-5">
                        <PageTitle title={<p>Carts <sup>({fetcher.data.count})</sup></p>} />
                        <section className='space-y-5' aria-label='Carts Section'>
                            {/* cart list */}
                            <article className="grid grid-cols-[repeat(auto-fit,minmax(min(45em,100%),1fr))] gap-1">
                                {fetcher.data.payload.map(cart => <Cart key={cart.cartId} {...cart} />)}
                            </article>
                            {/* cart pagination */}
                            {!isFetching &&
                                <Paginator
                                    fetcher={fetcher}
                                    page={fetcher.data.page ?? 1}
                                    disableNext={!fetcher.data.hasNextData}
                                    disablePrevious={!fetcher.data.hasPreviousData}
                                    nextAriaLabel={'Read the next paginated cart list.'}
                                    previousAriaLabel={'Read the previous paginated cart list.'}
                                />
                            }
                        </section>
                    </article>
                )
                : fetcher.data?.count === 0 && (<article className='p-10 space-y-10'>
                    <p className='text-xl'>O0H!!, it seems like you haven't added any product to your cart wishlist, please route through the <Link to={'/products'}>products</Link> page or <Link to={'/search'}>Search</Link> for a product, then click on the cart button at the bottom below, to add any product to your cart wishlist. </p>
                </article>)
        }

        {
            fetcher.data && (
                <section className="bg-white p-2 space-y-3 overflow-x-auto md:max-w-full"
                    aria-label="Products recommendation section">
                    <h2 className="text-2xl font-thin">Recommendations</h2>
                    <Suspense fallback={<SkeletonRecommendProducts />}>
                        <Await resolve={fetcher.data.recommendedProducts} errorElement={<p className='flex items-center gap-4 p-2 text-red-400'>
                            <CiCircleInfo /> Recommended products are not available.</p>
                        }>
                            {(products) => <RecommendProducts products={rProducts(products)} />}
                        </Await>
                    </Suspense>
                </section>
            )
        }
    </article>
    )
}

/* TEST THE MOBILE VERSION OF THIS PAGE BEFORE COMMITTING OR PROCEEDING. */
