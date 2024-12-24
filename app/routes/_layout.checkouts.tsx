import { RecommendProducts, SkeletonRecommendProducts } from "~/components/recommendProducts";
import { CartSkeleton, Cart as ShoppingCart } from "~/components/cart";
import { Link, Outlet, useFetcher } from "@remix-run/react";
import { TFetcher, TShoppingCart } from "~/modules/types";
export { loader } from "~/modules/.servers/cart.crud";
import { Paginator } from "~/components/paginator";
import PageTitle from "~/components/pageTitle";
import { useEffect, useState } from "react";

export function ErrorBoundary() {
    return (<article className="md:px-8 px-2 py-8 space-y-5">
        <PageTitle title={'Checkouts'} />
        <p className="px-4 py-3 bg-red-100 text-base">There was an error on the page, please ensure you have a good network connectivity and try reload this page</p>
        {/* Checkout Carts */}
        <article className="md:grid md:grid-cols-[minmax(30em,1fr),30em] gap-3 space-y-5 md:space-y-0">
            <article className="space-y-5">
                <CartSkeleton />
            </article>
            <section className="flex flex-col  bg-white" aria-label="Checkout summary section.">
                <dl className="py-4 px-2 space-y-2 border-b border-ring">
                    <dt className="border-b border-ring font-bold text-lg">SUMMARY </dt>
                    <dd className="space-y-2">
                        <p>Total Items: <strong>'Summarizing...'</strong></p>
                        <p>Total Quantities: <strong>'Summarizing...'</strong></p>
                        <p><strong>Summarizing...</strong></p>
                    </dd>
                </dl>
                <p className="my-4 p-3 text-center text-xl">
                    Oops, something went wrong here, a payment form should've shown here, but
                    there must be a network error occur, please try reload the page, sorry
                    for the inconvenience.
                </p>
            </section>
        </article>
        {<SkeletonRecommendProducts />}
    </article>)
}

export default function () {
    const fetcher = useFetcher<TFetcher<TShoppingCart>>()
    const [isFetching, setIsFetching] = useState(true)
    /* Load data initially */
    useEffect(() => void fetcher.load(location.pathname), [])
    /* Fetching state */
    useEffect(() => void setIsFetching(fetcher.state !== 'idle'), [fetcher.state])
    return (<article className="md:px-8 px-2 py-8 space-y-5">
        <PageTitle title={'Checkouts'} />
        <article className="md:grid md:grid-cols-[minmax(30em,1fr),30em] gap-3 space-y-5 md:space-y-0">
            <article className="space-y-5">
                {isFetching && <CartSkeleton count={fetcher.data?.count || 5} />}
                {
                    fetcher.data && fetcher.data.count ? (
                        <>
                            {!isFetching && (
                                <Paginator
                                    fetcher={fetcher}
                                    page={fetcher.data.page}
                                    disableNext={!fetcher.data.hasNextData}
                                    disablePrevious={!fetcher.data.hasPreviousData}
                                    nextAriaLabel="Get the next checkout list."
                                    previousAriaLabel="Get the previous checkout list." />
                            )}
                            <section className="divide-y divide-ring" aria-label="Checkout list section.">
                                {fetcher.data.payload.carts.map(cart => <ShoppingCart key={cart.cartId}
                                    isCheckout isSelected={cart.selected} cart={cart} />)}
                            </section>
                            {!isFetching && (
                                <Paginator
                                    fetcher={fetcher}
                                    page={fetcher.data.page}
                                    disableNext={!fetcher.data.hasNextData}
                                    disablePrevious={!fetcher.data.hasPreviousData}
                                    nextAriaLabel="Get the next checkout list."
                                    previousAriaLabel="Get the previous checkout list." />
                            )}
                        </>
                    ) : fetcher.data?.count === 0 && (
                        <article className='p-10 space-y-10'>
                            <p className='text-xl'>O0H!!, it seems like you haven't add any product to your cart wishlist, please route through the <Link to={'/products'}>products</Link> page or <Link to={'/search'}>Search</Link> for a product, then click on the cart button at the bottom below, to add any product to your cart wishlist. </p>
                        </article>
                    )
                }
                {/* pagination */}
            </article>
            <section className="flex flex-col justify-between bg-white" aria-label="Checkout summary section.">
                <dl className="py-4 px-2 space-y-2 border-b border-ring">
                    <dt className="border-b border-ring font-bold text-lg">SUMMARY </dt>
                    <dd className="space-y-2">
                        <p>Total Items: <strong>{isFetching ? 'Summarizing...' :
                            fetcher.data?.payload.totalInCheckouts ?? 0}</strong></p>
                        <p>Total Quantities: <strong>{isFetching ? 'Summarizing...' :
                            fetcher.data?.payload.totalQuantityInCheckouts ?? 0}</strong></p>
                        <p className="w-full">
                            {isFetching ? <strong>Summarizing...</strong> :
                                <>
                                    <strong className="text-2xl text-primary font-bold text-right">
                                        {Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency', maximumFractionDigits: 0 }).format(fetcher.data?.payload.totalPriceInCheckouts ?? 0)}
                                    </strong>
                                </>
                            }
                        </p>
                    </dd>
                </dl>
                <div className="flex-1 p-4"><Outlet /></div>
            </section>
        </article>
        {/* Product Recommendations */}
        {fetcher.data && fetcher.data.recommendedProducts &&
            (<RecommendProducts products={fetcher.data.recommendedProducts} />)}
    </article>
    )
}
