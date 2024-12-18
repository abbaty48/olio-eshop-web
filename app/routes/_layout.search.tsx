import { useFetcher, useSearchParams } from "@remix-run/react";
import { SearchInput } from "~/components/searchInput";
import { LoaderFunctionArgs } from "@remix-run/node";
import { prismaDB } from "~/modules/.servers/db.server";
import { useCallback, useEffect, useState } from "react";
import { TFetcher, TProduct } from "~/modules/types";
import { Paginator } from "~/components/paginator";
import { Product } from "~/components/product";
import { ImSpinner2 } from "react-icons/im";
import { Menu } from "~/components/menu";
import { Prisma } from "@prisma/client";
import { getIdentity } from "~/modules/.servers/session/auth";

const LIMIT = 4;

export async function loader({ request }: LoaderFunctionArgs) {
    const identity = await getIdentity(request)
    const query = new URL(request.url).searchParams;
    const page = Number(query.get('page') ?? 1)
    const term = query.get('term') ?? ''

    const whereClause: Prisma.ProductWhereInput = {
        OR: [
            { name: { contains: term } }, { tag: { contains: term } },
            { color: { contains: term } }, { material: { contains: term } }
        ]
    }

    let [count, payload] = await prismaDB.$transaction([
        prismaDB.product.count({ where: whereClause }),
        prismaDB.product.findMany({
            where: whereClause,
            skip: (page - 1) * LIMIT,
            take: LIMIT,
            include: { Cart: { where: { customerId: identity?.id }, select: { cartId: true } } }
        })
    ])

    const hasPreviousData = page > 1;
    const hasNextData = page < Math.ceil(count / LIMIT)
    payload = payload.map(product => ({ ...product, cartId: product.Cart[0]?.cartId }))
    return { page, count, hasNextData, hasPreviousData, payload }
}

export default function () {
    const [params] = useSearchParams()
    const fetcher = useFetcher<TFetcher<TProduct[]>>()
    const [isFetching, set] = useState(fetcher.state !== 'idle')
    /*  */
    useEffect(() => void set(fetcher.state !== 'idle'), [fetcher.state])
    /*  */
    const fetch = useCallback((target: HTMLFormElement) => fetcher.submit(target), [])
    /*  */
    return <div className="grid grid-rows-[auto,1fr,auto] md:px-8 py-2 space-y-4">
        <Menu />
        <search className="">
            <fetcher.Form className="" aria-label='Search for a product'>
                <label className="space-y-5">
                    <SearchInput name={'term'} fetch={fetch} autoFocus className=" border-b border-b-gray-100 text-2xl md:text-8xl font-thin bg-transparent outline-none uppercase" />
                    <span className="block text-xl md:text-2xl font-light">
                        Search the product you're looking for. <br />
                        <em className="text-[1.2rem] font-extrabold text-opacity-85"><strong className="text-opacity-100">Hint:</strong> Use tag keyword also: red seat, for kids, only women, blue table, office conference table.</em>
                    </span>
                </label>
            </fetcher.Form>
        </search>
        <article className="relative grid grid-rows-[auto,1fr,auto]  py-2 space-y-4 ">
            {isFetching && (
                <div className="absolute grid place-items-center inset-full top-0 right-0 bottom-0 left-0 bg-white/85 w-full h-full motion-safe:animate-pulse">
                    <ImSpinner2 className="animate-spin size-20 fill-primary" />
                </div>
            )
            }
            <article className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(min(40rem,100%),1fr))] auto-rows-auto gap-2  py-10">
                {
                    fetcher.data?.payload.map((product) => <Product key={product.id} product={product} size="small" />)
                }
            </article>
        </article>
        {!isFetching && fetcher.data &&
            <Paginator
                fetcher={fetcher}
                page={fetcher.data?.page ?? 1}
                term={params.get('term') ?? ''}
                disableNext={!fetcher.data?.hasNextData}
                disablePrevious={!fetcher.data?.hasPreviousData}
                nextAriaLabel="Read next paginated products"
                previousAriaLabel="Read the previous paginated products." />
        }
    </div>
}
