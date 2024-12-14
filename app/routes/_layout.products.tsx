import { useFetcher, useLocation } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { prismaDB } from "~/modules/.servers/db.server";
import { useEffect, useMemo, useState } from "react";
import { Paginator } from "~/components/paginator";
import { Product } from "~/components/product";
import PageTitle from "~/components/pageTitle";
import { useMedia } from "~/hooks/useMedia";
import { ImSpinner2 } from "react-icons/im";
import { TFetcher, TProduct } from "~/modules/types";

const LIMIT = 5;
export async function loader({ request }: LoaderFunctionArgs) {
    const page = Number(new URL(request.url).searchParams.get('page') ?? 1)
    const [count, products] = await prismaDB.$transaction(
        [
            prismaDB.product.count(),
            prismaDB.product.findMany({
                skip: (page - 1) * LIMIT,
                take: LIMIT,
                orderBy: { createdAt: 'asc' }
            })
        ]
    )
    const hasPreviousData = page > 1;
    const hasNextData = page < Math.ceil(count / LIMIT)
    return { page, count, hasPreviousData, hasNextData, payload: products }
}

export default function () {
    const { media } = useMedia()
    const location = useLocation()
    const [isFetching, setIsFetching] = useState(true)
    const fetcher = useFetcher<TFetcher<TProduct[]>>()
    /* Load data initially */
    useEffect(() => void fetcher.load(location.pathname), [])
    /* Fetching state */
    useEffect(() => void setIsFetching(fetcher.state !== 'idle'), [fetcher.state])
    /* Memoize the product items */
    const products = useMemo(() => {
        return fetcher.data?.payload.map((product) => {
            const rand = Math.floor(Math.random() * 3)
            const size = (rand === 1) ? 'small' :
                rand === 2 ? 'medium' : 'large';
            return media === 'larger' ? <Product key={product.id} product={product} size={size} /> :
                media === 'medium' ? <Product key={product.id} product={product} size={'medium'} /> :
                    <Product key={product.id} product={product} size={'small'} />
        })
    }, [fetcher.data])

    return <article className={'relative h-full overflow-hidden'}>
        {isFetching && (
            <div className="absolute grid place-items-center inset-full top-0 right-0 bottom-0 left-0 bg-white/85 w-full h-full motion-safe:animate-pulse">
                <ImSpinner2 className="animate-spin size-20 fill-primary" />
            </div>
        )
        }
        <article className="grid grid-rows-[auto,1fr,auto] md:px-8 py-2 space-y-4 overflow-y-auto max-h-screen">
            <PageTitle title={!isFetching && `Products / ${fetcher.data?.page ?? 1}`} />
            <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[1fr,auto,auto] gap-1 md:grid-flow-dense" aria-label="Products list">
                {products}
            </section>
            {/* cart pagination */}
            {!isFetching &&
                <Paginator
                    fetcher={fetcher}
                    disableNext={!fetcher.data?.hasNextData}
                    disablePrevious={!fetcher.data?.hasPreviousData}
                    nextAriaLabel="Read next paginated products"
                    previousAriaLabel="Read the previous paginated products." />
            }
        </article>
    </article>
}
