import { HiChevronLeft, HiOutlineRefresh } from "react-icons/hi";
import { TbBasketCancel, TbBasketCheck } from "react-icons/tb";
import { IoAddCircle, IoRemoveOutline } from "react-icons/io5";
import { MdRemoveShoppingCart } from "react-icons/md";
import { products } from "~/modules/mocks/products";
import { TCart, TProduct } from "~/modules/types";
import PageTitle from "~/components/pageTitle";
import { useFetcher } from "@remix-run/react";
import { carts } from "~/modules/mocks/cart";
import { CiImageOff } from "react-icons/ci";

export function Cart({ cartId, productId, subPrice, quantity, addedOn, product }: TCart) {
    const fetcher = useFetcher()
    return (
        <article key={cartId} className='bg-white md:max-h-[60vh] p-4'>
            {product ? (
                <div className='space-y-2'>
                    <section className="flex items-center gap-2 justify-between">
                        <button>
                            <TbBasketCheck />
                            {/* <TbBasketCancel /> */}
                        </button>
                        <p className='text-sm text-right'>Added On: {Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(addedOn))}</p>
                    </section>
                    <article className='flex flex-wrap flex-col justify-between'>
                        <figure className='flex-1 flex flex-wrap gap-3 items-center'>
                            <img src={`/features/${product.feature}`} alt={product.desc ?? product.tag}
                                className='w-[200px] h-[200px]' width={100} height={100} />
                            <figcaption>
                                <dl className='space-y-4'>
                                    <dt className='text-xl'> <sup>({quantity})</sup> {product.name} </dt>
                                    <dd className='text-primary text-3xl text-right font-thin'>{Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(subPrice)}
                                        <p className='relative top-1 text-[2rem] text-orange-500'><sub><strong>unit {Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(product.price)}</strong> </sub></p>
                                    </dd>
                                </dl>
                            </figcaption>
                        </figure>
                        <fetcher.Form className='flex items-center justify-end gap-2 p-2'>
                            <button className='hover:motion-preset-pulse-sm active:motion-preset-compress'><IoAddCircle /></button>
                            <button className='hover:motion-preset-pulse-sm active:motion-preset-compress'><IoRemoveOutline /></button>
                            <button className='hover:motion-preset-pulse-sm active:motion-preset-compress'><MdRemoveShoppingCart /></button>
                        </fetcher.Form>
                    </article>
                </div>
            ) : (
                <div className='space-y-2'>
                    <p className='text-sm text-right'>Added On: {Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(addedOn))}</p>
                    <div className='flex flex-wrap items-center gap-5'>
                        <div className='w-[100px] h-[100px] bg-gray-50 grid place-items-center'><CiImageOff /> </div>
                        <p className='font-thin text-2xl text-primary'>
                            Product not available. <br />
                            <small className='text-xs font-extrabold text-orange-400'>The product associated with this cart is currently not available in the store.</small>
                        </p>
                    </div>
                    <fetcher.Form className='flex items-center justify-end gap-2 p-2'>
                        <button className='hover:motion-preset-pulse-sm active:motion-preset-compress'><MdRemoveShoppingCart /></button>
                    </fetcher.Form>
                </div>
            )
            }
        </article >
    )
}

export function RecommendProduct({ id, name, feature, tag, desc, price }: TProduct) {
    const fetcher = useFetcher()
    // TIPS: the recommended products should not be in the user's carts list
    return (
        <article key={id} className='bg-white min-w-80 md:max-h-[60vh] p-4 space-y-2'>
            <figure className='flex-1 flex flex-wrap gap-3 items-center'>
                <img src={`/features/${feature}`} alt={desc ?? tag} className='w-[200px] h-[200px]' width={100} height={100} />
                <figcaption className="space-y-2 w-full">
                    <p className='text-base'>{name}</p>
                    <p className='text-[2rem] text-orange-500'>{Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(price)}</p>
                    <fetcher.Form className='flex items-center justify-end w-full'>
                        <button className='hover:motion-preset-pulse-sm active:motion-preset-compress'><IoAddCircle /></button>
                    </fetcher.Form>
                </figcaption>
            </figure>
        </article >
    )
}

export default function () {
    return (<article className="md:px-8 px-2 py-8 space-y-5">
        <PageTitle title={'Checkouts'} />
        {/* carts */}
        <article className="md:grid md:grid-cols-[minmax(30em,1fr),30em] gap-3 space-y-5 md:space-y-0">
            <article className="space-y-5">
                <section className="divide-y divide-ring">
                    {carts.map(cart => <Cart {...cart} />)}
                </section>
                {/* cart pagination */}
                <div className='flex'>
                    <button className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-2 md:p-4">
                        <HiChevronLeft /></button>
                    <button className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-2 md:p-4 bg-white text-2xl font-thin flex gap-3 items-center border-none"><HiOutlineRefresh className='animate-spin' /> Load More
                    </button>
                </div>
            </article>
            <aside className="bg-white">
                <p>use the stripe checkout payment ui here and remove this.</p>
            </aside>
        </article>
        <section className="bg-white p-2 space-y-3">
            <h4 className="text-2xl font-thin">Recommendations</h4>
            {/*  **use defer technic here to deferred this recommendation section */}
            <article className="flex overflow-x-auto divide-x divide-ring/20">
                {products.map(product => <RecommendProduct {...product} />)}
            </article>
        </section>
        {/* Product Recommendations */}
    </article>
    )
}
