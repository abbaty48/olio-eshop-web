import { IoAddCircle, IoRemoveOutline } from 'react-icons/io5';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import PageTitle from '../components/pageTitle';
import { useFetcher } from '@remix-run/react';
import { HiChevronLeft } from 'react-icons/hi2';
import { carts } from '~/modules/mocks/cart';
import { CiImageOff } from 'react-icons/ci';
import { TCart } from '~/modules/types';

export function Cart({ cartId, productId, subPrice, quantity, addedOn, product }: TCart) {
    const fetcher = useFetcher()
    return (
        <article key={cartId} className='bg-white md:max-h-[60vh] p-4'>
            {product ? (
                <div className='space-y-2'>
                    <p className='text-sm text-right'>Added On: {Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(addedOn))}</p>
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

export default function () {
    return (<article className="md:px-8 px-2 py-8 space-y-5">
        <PageTitle title={<p>Carts <sup>({carts.length})</sup></p>} />
        <section className='space-y-5'>
            {/* cart list */}
            <article className="grid grid-cols-[repeat(auto-fit,minmax(min(45em,100%),1fr))] gap-1">
                {carts.map(cart => <Cart {...cart} />)}
            </article>
            {/* cart pagination */}
            <div className='flex'>
                <button className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-2 md:p-4">
                    <HiChevronLeft /></button>
                <button className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-2 md:p-4 bg-white text-2xl font-thin flex gap-3 items-center border-none"><HiOutlineRefresh className='animate-spin' /> Load More
                </button>
            </div>
        </section>
    </article>
    )
}

/* TEST THE MOBILE VERSION OF THIS PAGE BEFORE COMMITTING OR PROCEEDING. */
