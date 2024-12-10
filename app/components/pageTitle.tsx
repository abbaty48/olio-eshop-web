import { ReactNode } from "react";
import { Menu } from "./menu";

export default function PageTitle({ title }: { title: ReactNode }) {
    return (
        <section>
            <h1 className="font-thin">{title}</h1>
            <Menu />
        </section>
    )
}
