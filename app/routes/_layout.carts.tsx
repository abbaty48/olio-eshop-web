import { IoAddCircle, IoRemoveOutline } from 'react-icons/io5';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { TCart, TProduct } from '~/modules/types';
import { HiOutlineRefresh } from 'react-icons/hi';
import PageTitle from '../components/pageTitle';
import { useFetcher } from '@remix-run/react';
import { HiChevronLeft } from 'react-icons/hi2';
import { CiImageOff } from 'react-icons/ci';

const products: TProduct[] = [
    { id: "37f3dbf4fb281a881804faa4b11b826df", name: 'Half Apple', price: 25, desc: 'Half apple red seat', feature: '37f3dbf4fb281a881804faa4b11b826df.avif', tag: 'plastic, seat, red, affordable, small, comfort, anywhere, home, office, kids, children, men, women' },
    { id: "0fb6aeec2fcf5d72df84ceca1760c1267", name: 'Chairman Table', price: 20, feature: '0fb6aeec2fcf5d72df84ceca1760c1267.avif', tag: 'table, wood, affordable, restaurant, home, white' },
    {
        id: "52ac2eef7608368acdef20141435c170c", name: 'Half 190', price: 35, desc: 'Half 190 blue seat', feature: '52ac2eef7608368acdef20141435c170c.avif',
        tag: 'plastic, seat, blue, affordable, small, comfort, anywhere, home, office, kids, children'
    },
    { id: "1bf0fb0cc4fdc27acb3ef87ae203486da", name: 'Swivel Chair', price: 15, desc: 'Suitable for office and home, fit for arm rest and angle position', feature: '1bf0fb0cc4fdc27acb3ef87ae203486da.avif', tag: 'Office & Desk Chairs Swivel chair, chair, angle, furniture, armrest' },
    { id: "de223b354225ec6d5811bd30bc84c6fde", name: 'Nursery Bunk Bed', price: 62, feature: 'de223b354225ec6d5811bd30bc84c6fde.avif', tag: 'Pillows on bed, Bedroom Furniture Nursery Bunk bed, bed, angle, mattress, furniture' },
]

const carts: TCart[] = [
    { cartId: '48g2ecg5fb281a881804faa4b11b826df', productId: '37f3dbf4fb281a881804faa4b11b826df', quantity: 1, subPrice: 12, addedOn: new Date(Date.now()).toLocaleDateString() },
    { cartId: '1fe6affd2fcf5d72df84ceca1760c1278', productId: '0fb6aeec2fcf5d72df84ceca1760c1267', quantity: 2, subPrice: 55, addedOn: new Date(Date.now()).toLocaleDateString() },
    { cartId: '42be2fff7608368acdef20242526d480d', productId: '52ac2eef7608368acdef20141435c170c-', quantity: 1, subPrice: 3, addedOn: new Date(Date.now()).toLocaleDateString() },
].map(cart => {
    const product = products.find(p => p.id === cart.productId)
    return ({
        ...cart,
        product,
        subPrice: (product?.price || 0) * cart.quantity,
    })
})

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
