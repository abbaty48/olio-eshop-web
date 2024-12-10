import { HiChevronLeft, HiOutlineRefresh } from "react-icons/hi";
import { Product } from "~/components/product";
import PageTitle from "~/components/pageTitle";
import { useMedia } from "~/hooks/useMedia";
import { TProduct } from "~/modules/types";

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

export default function () {
    const { media } = useMedia()

    return <article className="md:px-8 px-2 py-8 space-y-5">
        <PageTitle title={'Products'} />
        <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[1fr,auto,auto] overflow-y-auto gap-1 md:grid-flow-dense" aria-label="Products list">
            {
                products.map((product) => {
                    const rand = Math.floor(Math.random() * 3)
                    const size = (rand === 1) ? 'small' :
                        rand === 2 ? 'medium' : 'large';
                    return media === 'larger' ? <Product key={product.id} product={product} size={size} /> :
                        media === 'medium' ? <Product key={product.id} product={product} size={'medium'} /> :
                            <Product key={product.id} product={product} size={'small'} />
                })
            }
        </section>
        {/* cart pagination */}
        <section className='flex' aria-label="Product pagination's">
            <button aria-label="Previous paginated products" className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-4">
                <HiChevronLeft /></button>
            <button aria-label="Get next paginated products" className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-4 bg-white text-2xl font-thin flex gap-3 items-center border-none"><HiOutlineRefresh className='animate-spin' /> Load More
            </button>
        </section>
    </article>
}
