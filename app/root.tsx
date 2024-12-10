import "./tailwind.css";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import og from '/features/olios_ogimage.png'

export const meta: MetaFunction = () => [
    { title: 'Modern appealing ergonomic appliance for home and office..' },
    { name: 'description', content: 'We sell modern edged ergonomics appliance for home and office furniture\'s. At Olio, you can find chairs,beds,office sets, room sets, and very more.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'og:image', content: og },
    { name: 'og:title', content: 'Modern appealing ergonomic appliance for home and office..' },
    { name: 'twitter:title', content: 'Modern appealing ergonomic appliance for home and office..' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@olios_furniture\'s' },
    { name: 'robots', content: 'index' }
]
export const links: LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
