import { RiHome9Line, RiLoginBoxLine, RiSearch2Line, RiShoppingBasket2Line } from "react-icons/ri";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Tag from '/7a5b0f1328aa7be1d1bde754e8dd67ffc.webp'
import { LiaShippingFastSolid } from "react-icons/lia";
import { MainLink } from "~/components/menuLink";
import { Link, Outlet } from "@remix-run/react";
import { BiCategory } from "react-icons/bi";

export default function () {
    return (<main className="grid grid-cols-[minmax(3rem,_auto),_1fr] bg-gray-50 h-full overflow-hidden">
        <aside className="bg-white shadow-[0px_5px_50px_#dbdbdb]">
            <nav className="h-full md:px-10">
                <ul className="flex flex-col justify-between items-center h-full gap-5 md:gap-10 text-icon">
                    <Link to="/" className="grid place-items-center mt-4 mb-10"><img src={Tag} alt="Olio.com" width={42} height={42} className="w-7/12 md:w-11/12" /></Link>
                    <MainLink title="Main" to="/" icon={<RiHome9Line className="md:size-8"/>} />
                    <MainLink title="Products" to="/products" icon={<BiCategory className="md:size-8" />} />
                    <MainLink title="Search" to="/search" icon={<RiSearch2Line className="md:size-8" />} />
                    <MainLink title="Carts" to="/carts" icon={<RiShoppingBasket2Line className="md:size-8" />} />
                    <MainLink title="Checkouts" to="/checkouts" icon={<MdOutlineShoppingCartCheckout className="md:size-8" />} />
                    <MainLink title="Orders" to="/orders" icon={<LiaShippingFastSolid className="md:size-8" />} />
                    <MainLink title="Login" to="/auth" icon={<RiLoginBoxLine className="md:size-8" />} className="mt-auto my-4" />
                </ul>
            </nav>
        </aside>
        <article className="min-h-screen max-w-screen-2xl overflow-auto"><Outlet /></article>
    </main>);
}
