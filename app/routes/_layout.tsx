import { RiHome9Line, RiLoginBoxLine, RiLogoutBoxLine, RiSearch2Line, RiShoppingBasket2Line } from "react-icons/ri";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Tag from '/7a5b0f1328aa7be1d1bde754e8dd67ffc.webp'
import { Form, Link, Outlet } from "@remix-run/react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MainLink } from "~/components/menuLink";
import { useIdentity } from "~/modules/identity";
import { BiCategory } from "react-icons/bi";

export default function () {
    const identity = useIdentity()
    const isAuthenticated = Boolean(identity)

    return (
        <>
            <aside className="bg-white shadow-[0px_5px_50px_#dbdbdb]" aria-label="site navigation's">
                <nav className="h-full">
                    <ul className="flex flex-col justify-between items-center gap-5 md:gap-10 text-icon md:px-5 h-full max-h-screen">
                        <li><Link to="/" aria-current="page" className="grid place-items-center my-4"><img src={Tag} alt="Olio.com" width={42} height={42} className="w-7/12 md:w-11/12" /></Link></li>
                        <li><MainLink to="/" aria-current="page" aria-label="View Homepage" icon={<RiHome9Line className="md:size-8" />} /></li>
                        <li><MainLink to="/products" aria-label="View Products" icon={<BiCategory className="md:size-8" />} /></li>
                        <li><MainLink to="/search" aria-label="Search Products" icon={<RiSearch2Line className="md:size-8" />} /></li>
                        {
                            isAuthenticated && (
                                <>
                                    <li><MainLink to="/carts" aria-label="View your carts" icon={<RiShoppingBasket2Line className="md:size-8" />} /></li>
                                    <li><MainLink to="/checkouts" aria-label="View your checkout lists" icon={<MdOutlineShoppingCartCheckout className="md:size-8" />} /></li>
                                    <li><MainLink to="/orders" aria-label="Check your orders" icon={<LiaShippingFastSolid className="md:size-8" />} /></li>
                                </>
                            )
                        }
                        <li>
                            <Form action={isAuthenticated ? "/auth/logout" : "/auth/login"} method="post">
                                <button type="submit">
                                    {
                                        isAuthenticated ? <RiLogoutBoxLine className="md:size-8 hover:text-primary hover:cursor-pointer" /> :
                                            <RiLoginBoxLine className="md:size-8 hover:text-primary hover:cursor-pointer" />
                                    }
                                </button>
                            </Form>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="min-h-screen max-w-screen-2xl overflow-auto"><Outlet /></main>
        </>
    );
}
