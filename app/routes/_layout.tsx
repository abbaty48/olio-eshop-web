import { Outlet } from "@remix-run/react";

export default function () {
    return (<main className="grid grid-cols-[minmax(4rem,_auto),_1fr] bg-gray-50 min-h-screen">
        <aside className="bg-white"></aside>
        <section><Outlet /></section>
    </main>);
}
