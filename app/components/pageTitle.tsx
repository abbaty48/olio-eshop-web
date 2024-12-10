import { ReactNode } from "react";
import { Menu } from "./menu";

export default function PageTitle({ title }: { title: ReactNode }) {
    return (
        <section aria-label={`${title} Page`}>
            <h1 className="font-thin">{title}</h1>
            <Menu />
        </section>
    )
}
