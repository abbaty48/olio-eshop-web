import { RiMenu4Line } from "react-icons/ri";
import { categories } from "~/modules/utils";
import { NavLink } from "@remix-run/react";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import clsx from "clsx";

export function Menu() {
    const [shown, set] = useState(false)

    return (
        <> {shown ? <div className="grid grid-rows-[auto,_1fr] fixed right-0 top-0 bottom-0 h-full w-1/2 md:w-1/6  py-5 md:py-10 px-4 md:px-8 bg-white z-50 motion-preset-slide-left-md motion-preset-fade-lg">
            <button onClick={() => set(false)} className="place-self-end bg-white ring-1 ring-ring p-2 md:p-5 rounded-full text-primary motion-duration-1000 motion-ease-in hover:motion-preset-pulse-sm cursor-pointer">
                <MdClose />
            </button>
            <ul className="mt-10 mb-4 space-y-10">
                {categories.map(({ label, path, icon: Icon }) => {
                    return (
                        <li key={path}>
                            <NavLink to={`/products/${path}`} prefetch="intent" viewTransition replace
                                className={({ isActive }) => clsx('flex justify-between items-center md:text-[1.8rem] uppercase hover:text-primary', 'hover:text-primary', isActive && 'text-primary')}>
                                {label} <Icon />
                            </NavLink>
                        </li>
                    )
                }
                )
                }
            </ul>
        </div> :
            <button onClick={() => set(true)} aria-label="Open Menu list" className="fixed top-4 right-4 bg-white z-[1000] shadow-2xl p-5 rounded-full text-primary motion-duration-1000 motion-ease-in-out hover:motion-scale-out-75">
                <RiMenu4Line />
            </button>
        }</>
    )
}
