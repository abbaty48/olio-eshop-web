import { RecommendProducts, } from '~/components/recommendProducts';
import { TFetcher, TShoppingCart, } from '~/modules/types';
import { Link, useFetcher } from '@remix-run/react';
import { Paginator } from '~/components/paginator';
import PageTitle from '../components/pageTitle';
import { ImSpinner2 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { Cart } from '~/components/cart';
export { loader } from '~/modules/.servers/cart.crud';

export default function () {
    const fetcher = useFetcher<TFetcher<TShoppingCart>>()
    const [isFetching, setIsFetching] = useState(true)
    /* Load data initially */
    useEffect(() => void fetcher.load(location.pathname), [])
    /* Fetching state */
    useEffect(() => void setIsFetching(fetcher.state !== 'idle'), [fetcher.state])
    /*  */
    return (<article className={'relative min-h-screen space-y-10 flex flex-col justify-between gap-10'}>
        {isFetching && (<div className="absolute grid place-items-center inset-full top-0 right-0 bottom-0 left-0 bg-white/85 w-full motion-safe:animate-pulse overflow-hidden z-[5000]">
            <ImSpinner2 className="animate-spin size-20 fill-primary" />
        </div>
        )}

        {
            fetcher.data && fetcher.data.count ? (
                <article className="md:px-8 px-2 py-8 space-y-5">
                    <PageTitle title={<p>Carts <sup>({fetcher.data.count})</sup></p>} />
                    <section className='space-y-5' aria-label='Carts Section'>
                        {/* cart list */}
                        <article className="grid grid-cols-[repeat(auto-fit,minmax(min(45em,100%),1fr))] gap-1">
                            {fetcher.data.payload.carts.map(cart => <Cart key={cart.cartId} cart={cart} />)}
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
            ) : fetcher.data?.count === 0 && (<article className='p-10 space-y-10'>
                <p className='text-xl'>O0H!!, it seems like you haven't add any product to your cart wishlist, please route through the <Link to={'/products'}>products</Link> page or <Link to={'/search'}>Search</Link> for a product, then click on the cart button at the bottom below, to add any product to your cart wishlist. </p>
            </article>)
        }

        {fetcher.data && fetcher.data.recommendedProducts &&
            (<RecommendProducts products={fetcher.data.recommendedProducts} />)}
    </article>
    )
}
