import { Link, useFetcher } from "@remix-run/react"
import { IoAddCircle } from "react-icons/io5"
import { TProduct } from "~/modules/types"

type TProps = { products: TProduct[] }
export function RecommendProducts({ products }: TProps) {
    const fetcher = useFetcher()
    return (
        <article className="grid grid-flow-col auto-cols-[25rem] grid-rows-[1fr,auto,auto,50px] bg-white min-w-80 md:max-h-[60vh] overflow-x-auto divide-x divide-ring/20">
            {products?.map(({ id, name, feature, tag, desc, price }) => (
                <article key={id} className='grid grid-rows-subgrid row-span-4 px-2 py-4'>
                    <Link to={`/product/${id}`} className="grid grid-rows-subgrid row-span-3">
                        <figure className='grid grid-rows-subgrid row-span-3  space-y-6'>
                            <img src={`/features/${feature}`} alt={desc ?? tag} className='row-start-1 row-end-2 place-self-center' width={200} height={200} />
                            <p className='row-start-2 row-end-3 text-base'>{name}</p>
                            <p className='row-start-3 row-end-4 text-[1.5rem] text-orange-500'>{Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(price)}</p>
                        </figure>
                    </Link>
                    <fetcher.Form className='row-start-4 row-end-5 flex items-center justify-end'>
                        <button aria-label="Add the product to your carts list." className='hover:motion-preset-pulse-sm active:motion-preset-compress'><IoAddCircle /></button>
                    </fetcher.Form>
                </article>
            ))}
        </article>
    )
}

export function SkeletonRecommendProducts() {
    return (
        <article className='flex gap-5 bg-white md:max-h-[60vh] overflow-x-auto p-4 divide-x divide-ring/20 w-screen'>
            {Array.from({ length: 10 }).map((_, _i) => <div key={_i} className='flex-1 flex flex-wrap gap-3 items-center bg-gray-50'>
                <div className='w-[200px] h-[200px] bg-gray-100 animate-pulse'></div>
                <div className="space-y-2 w-full">
                    <div className='bg-white h-[2.4rem] w-2/3 animate-pulse'></div>
                    <div className='bg-white h-[2rem] w-2/6 animate-pulse'></div>
                    <div className='flex items-center justify-end p-2'>
                        <div className="w-10 h-10 rounded-full bg-white animate-pulse"></div>
                    </div>
                </div>
            </div>)}
        </article>
    )
}
