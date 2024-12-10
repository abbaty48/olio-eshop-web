import { HiChevronLeft, HiOutlineRefresh } from "react-icons/hi";
import { SearchProduct } from "~/components/product";
import { Menu } from "~/components/menu";
import { TProduct } from "~/modules/types";
import { Form } from "@remix-run/react";

const products: TProduct[] = [
    { id: "37f3dbf4fb281a881804faa4b11b826df", name: 'Half Apple', price: 25, desc: 'Half apple red seat', feature: '37f3dbf4fb281a881804faa4b11b826df.avif', tag: 'plastic, seat, red, affordable, small, comfort, anywhere, home, office, kids, children, men, women' },
    { id: "0fb6aeec2fcf5d72df84ceca1760c1267", name: 'Chairman Table', price: 20, feature: '0fb6aeec2fcf5d72df84ceca1760c1267.avif', tag: 'table, wood, affordable, restaurant, home, white' },
    {
        id: "52ac2eef7608368acdef20141435c170c", name: 'Half 190', price: 35, desc: 'Half 190 blue seat', feature: '52ac2eef7608368acdef20141435c170c.avif',
        tag: 'plastic, seat, blue, affordable, small, comfort, anywhere, home, office, kids, children'
    },
    // { id: "1bf0fb0cc4fdc27acb3ef87ae203486da", name: 'Swivel Chair', price: 15, desc: 'Suitable for office and home, fit for arm rest and angle position', feature: '1bf0fb0cc4fdc27acb3ef87ae203486da.avif', tag: 'Office & Desk Chairs Swivel chair, chair, angle, furniture, armrest' },
    // { id: "de223b354225ec6d5811bd30bc84c6fde", name: 'Nursery Bunk Bed', price: 62, feature: 'de223b354225ec6d5811bd30bc84c6fde.avif', tag: 'Pillows on bed, Bedroom Furniture Nursery Bunk bed, bed, angle, mattress, furniture' },
]

export default function () {
    return <div className="flex flex-col items-center justify-between md:px-8 px-2 py-8 space-y-5">
        <Menu />
        <search className="w-11/12">
            <Form className="w-full">
                <label className="space-y-5">
                    <input type="search" className="px=5 md:px-10 py-2 md:py-5 border-b border-b-ring text-2xl md:text-8xl font-thin bg-transparent outline-none uppercase" />
                    <span className="block text-xl md:text-2xl font-light">
                        Search the product you're looking for. <br />
                        <em className="text-[1.2rem] font-extrabold text-opacity-85"><strong className="text-opacity-100">Hint:</strong> Use tag keyword also: red seat, for kids, only women, blue table, office conference table.</em>
                    </span>
                </label>
            </Form>
        </search>
        <article className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(min(40rem,100%),1fr))] auto-rows-auto gap-  w-full py-10">
            {
                products.map((product) => <SearchProduct {...product} />)
            }
        </article>
        {/* cart pagination */}
        <div className='flex'>
            <button className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-4">
                <HiChevronLeft /></button>
            <button className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-4 bg-white text-2xl font-thin flex gap-3 items-center border-none"><HiOutlineRefresh className='animate-spin' /> Load More
            </button>
        </div>
    </div>
}
