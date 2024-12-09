import { NavLink } from "@remix-run/react";
import { HTMLAttributes } from "react";
import clsx from "clsx";

type TMainLinkProp = HTMLAttributes<HTMLAnchorElement> & {
    to: string;
    icon: React.ReactNode
}

export function MainLink({ to, icon, ...props }: TMainLinkProp) {
    return <NavLink to={to}  {...props} className={({ isActive }) => clsx(props.className, 'hover:text-primary', isActive && 'text-primary')}>
        {icon}
    </NavLink>
}
