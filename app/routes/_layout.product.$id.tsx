import { useLoaderData, useFetcher, useNavigation } from '@remix-run/react';
import { RecommendProducts, } from '~/components/recommendProducts';
import ImageMagnifier from '~/components/imageZoom/zoom';
import { getIdentity } from '~/modules/.servers/session/auth';
import { LoaderFunctionArgs } from '@remix-run/node';
import { prismaDB } from '~/modules/.servers/db.server';
import { useCallback, useEffect, useState } from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import { TbShoppingCartOff } from 'react-icons/tb';
import { TCart, TProduct } from '~/modules/types';
import { CgSpinnerAlt } from 'react-icons/cg';
import { ImSpinner2 } from 'react-icons/im';

export async function loader({ params, request }: LoaderFunctionArgs) {
    const identity = await getIdentity(request)

    const product = await prismaDB.product.findUnique({ where: { id: params.id }, include: { Cart: { where: { customerId: identity?.id ?? '' }, select: { cartId: true, quantity: true, subPrice: true } } } })
    const recommendedProducts = new Promise<TProduct[]>(resolve => resolve(prismaDB.product.findMany({
        take: 10,
        where: {
            OR: [
                { name: { contains: product?.name } },
                { tag: { contains: product?.tag } },
                { color: { contains: product?.color } },
                { material: { contains: product?.material } }
            ],
        },
        include: { Cart: { where: { customerId: identity?.id ?? '' }, select: { cartId: true } } }
    })))
    return { product, recommendedProducts }
}

function AddToCart({ id, price, subPrice, cartId, quantity }: TProduct &
    Pick<TCart, 'cartId' | 'subPrice' | 'quantity'>) {

    const fetcher = useFetcher<{ success: boolean }>()
    const cartProcessing = fetcher.state !== 'idle'
    const [{ subPrice: total, quantity: qty }, set] = useState(() =>
        ({ subPrice: subPrice ?? price, quantity: quantity ?? 1 }))
    /*  */
    const removeAction = `/carts/remove/${cartId}`
    const addAction = `/carts/add/${qty}/${total}/${id}`
    const updateAction = `/carts/update/${cartId}/${qty}/${total}`
    /*  */
    const onMutate = useCallback((qty: number) => set({ quantity: qty, subPrice: price * qty }), [])

    return <div className='flex flex-wrap gap-5 justify-between'>
        <div className='space-y-4'>
            <h2 className='text-[1.8rem] font-light'>Cost</h2>
            <p className='text-2xl text-primary font-bold space-x-4'>
                <span>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
                    <sup className='text-base'>(<strong>{qty}</strong>)</sup>
                </span>
                <span className="text-black">
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
                </span>
            </p>
        </div>
        <div className='space-y-4'>
            <h3 className='text-[1.8rem] font-light'>Quantity</h3>
            <fetcher.Form className='flex gap-2' method="PUT"
                action={cartId ? updateAction : addAction}>
                <input type='number' name="quantity" className='bg-white font-extrabold text-xl rounded-full w-15 px-1 text-center' min="1" defaultValue={quantity ?? 1}
                    onChange={(e) => onMutate(Number(e.target.value ?? qty))} />
                <button type="submit" disabled={cartProcessing} className='flex items-center justify-between gap-4 bg-primary py-3 px-8 rounded-full text-white disabled:pointer-events-none disabled:bg-opacity-15 hover:motion-preset-focus-sm hover:cursor-pointer'>
                    {cartId ? 'Update Cart' : 'Add to Cart'}
                    {cartProcessing ? <CgSpinnerAlt className='animate-spin' /> :
                        (fetcher.data?.success === false) && <BsExclamationTriangle className='stroke-orange-400' />
                    }
                </button>
                {(cartId && !cartProcessing) && (<button type='submit'
                    formAction={removeAction}><TbShoppingCartOff />
                </button>)}
            </fetcher.Form>
        </div>
    </div >
}

export default function () {
    const { product, recommendedProducts } = useLoaderData<typeof loader>()
    const [isFetching, set] = useState(true)
    const navigation = useNavigation()
    const fetcher = useFetcher()
    /*  */
    useEffect(() => void set(fetcher.state !== 'idle' || navigation.state === 'loading'), [fetcher.state, navigation.state])

    return isFetching ? (
        <div className="absolute grid place-items-center inset-full top-0 right-0 bottom-0 left-0 bg-white/85 w-full motion-safe:animate-pulse overflow-hidden">
            <ImSpinner2 className="animate-spin size-20 fill-primary" />
        </div>
    ) : product ? (
        <article className="grid grid-rows-[50vh,1fr] lg:grid-cols-[repeat(2,50%)] lg:grid-rows-1 overflow-y-auto" >
            <ImageMagnifier src={`/features/${product.feature ?? ''}`} />
            <article className='flex flex-col justify-between'>
                <article className='p-4 md:p-16 grid place-items-center'>
                    <div className='space-y-5'>
                        <h1 className={'text-xl md:text-[7.2rem] font-light text-primary lg:leading-[100px]'}>{product.name} - <span className='text-black'>{product.category}</span></h1>
                        <p className='text-xl md:text-[2.4rem] font-light'>{product.desc ?? 'No information about the product yet.'}</p>
                        <AddToCart
                            key={product.Cart[0]?.cartId}
                            cartId={product.Cart[0]?.cartId}
                            quantity={product.Cart[0]?.quantity}
                            subPrice={product.Cart[0]?.subPrice} {...product} />
                    </div>
                </article>
                <RecommendProducts products={recommendedProducts} />
            </article>
        </article >) : <></>
}
