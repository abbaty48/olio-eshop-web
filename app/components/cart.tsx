import { TbBasketCancel, TbBasketCheck } from "react-icons/tb"
import { IoAddCircle, IoRemoveOutline } from "react-icons/io5"
import { MdRemoveShoppingCart } from "react-icons/md"
import { memo, useCallback, useState } from "react"
import { useFetcher } from "@remix-run/react"
import { ImSpinner2 } from "react-icons/im"
import { CiImageOff } from "react-icons/ci"
import { TCart } from "~/modules/types"

type TProp = {
    cart: TCart,
    isSelected?: boolean,
    isCheckout?: boolean,
}

export const Cart = memo(({ cart, isSelected, isCheckout }: TProp) => {
    /*  */
    const { cartId, subPrice, quantity, addedOn, product } = cart;
    /*  */
    const fetcher = useFetcher()
    const cartProcessing = fetcher.state !== 'idle'
    const cartDeleting = fetcher.formMethod === 'DELETE'
    const cartSelecting = fetcher.formMethod === 'PATCH' && fetcher.state === 'submitting'
    const [{ price, qty }, set] = useState(() => ({ price: subPrice, qty: quantity }))
    /*  */
    const updateAction = `/carts/update/${cartId}/${qty}/${price}`
    const removeAction = `/carts/remove/${cartId}`
    /*  */
    const onMutate = useCallback((qty: number) => {
        if (product) {
            set(() => ({
                qty: qty <= 1 ? 1 : qty,
                price: product.price * qty
            }))
        }
    }, [])
    /*  */
    const onCheck = useCallback((cartId: string, isChecked: boolean) => {
        fetcher.submit('/', { method: 'PATCH', action: `/carts/optCart/${cartId}/${isChecked}`, flushSync: true })
    }, [])

    return (
        <article hidden={cartDeleting} className='bg-white md:max-h-[60vh]  relative'>
            {product ? (
                <div className='space-y-2 p-4'>
                    <div className="flex items-center gap-2 justify-between w-full">
                        {isCheckout && isCheckout === true && (
                            <fetcher.Form aria-label={isSelected ? 'Deselect' : 'Select' + ' the item from checkout list.'}>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={cartSelecting || isSelected}
                                        onChange={(e) => onCheck(cartId, e.target.checked)} />
                                    {isSelected ? <TbBasketCheck /> : <TbBasketCancel />}
                                </label>
                            </fetcher.Form>
                        )
                        }
                        <p className='text-sm text-right w-full'>Added On: {Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(addedOn))}</p>
                    </div>
                    <article className='flex flex-wrap flex-col justify-between relative'>
                        {cartProcessing && (<span className="absolute bottom-2 left-2 animate-spin"><ImSpinner2 className='stroke-primary' /></span>
                        )}
                        <figure className='flex-1 flex flex-wrap gap-3 items-center justify-between'>
                            <img src={`/features/${product.feature}`} alt={product.desc ?? product.tag}
                                className='w-[200px] h-[200px]' width={100} height={100} />
                            <figcaption>
                                <dl className='space-y-4'>
                                    <dt className='text-xl text-wrap whitespace-pre-wrap max-w-[30ch]'>
                                        <sup>({qty})</sup> {product.name} </dt>
                                    <dd className='primary text-3xl text-right font-thin'>{Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency', maximumFractionDigits: 0 }).format(price)}
                                        <p className='relative top-1 text-[2rem] text-orange-500'><sub><strong>unit {Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency', maximumFractionDigits: 0 }).format(product.price)}</strong> </sub></p>
                                    </dd>
                                </dl>
                            </figcaption>
                        </figure>
                        <fetcher.Form aria-label={`Manage the cart for ${product.name} by Increment or Decrement the quantity of the cart or remove a cart.`} className='flex items-center justify-end gap-2 p-2'>
                            <button aria-label={'Increment 1 more quantity of cart.'}
                                onClick={() => onMutate(qty + 1)}
                                formAction={updateAction} formMethod='PUT' className='hover:motion-preset-pulse-sm active:motion-preset-compress'>
                                <IoAddCircle /></button>
                            <button aria-label='Decrement 1 more quantity of cart.'
                                disabled={quantity <= 1}
                                onClick={() => onMutate(qty - 1)}
                                formAction={updateAction} formMethod='PUT' className='disabled:pointer-events-none disabled:opacity-30 hover:motion-preset-pulse-sm active:motion-preset-compress'><IoRemoveOutline /></button>
                            <button
                                aria-label='Remove the cart from the carts list.'
                                formAction={removeAction}
                                formMethod='DELETE' className='hover:motion-preset-pulse-sm active:motion-preset-compress'><MdRemoveShoppingCart /></button>
                        </fetcher.Form>
                    </article>
                </div>
            ) : (
                <div className='space-y-2 p-4'>
                    <p className='text-sm text-right'>Added On: {Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(addedOn))}</p>
                    <div className='flex flex-wrap items-center gap-5'>
                        <div className='w-[100px] h-[100px] bg-gray-50 grid place-items-center'><CiImageOff /> </div>
                        <p className='font-thin text-2xl text-primary'>
                            Product not available. <br />
                            <small className='text-xs font-extrabold text-orange-400'>The product associated with this cart is currently not available in the store.</small>
                        </p>
                    </div>
                    <fetcher.Form className='flex items-center justify-end gap-2 p-2' aria-label='Remove the cart form the carts list'>
                        <button aria-label='Remove the cart from the carts list.' className='hover:motion-preset-pulse-sm active:motion-preset-compress'><MdRemoveShoppingCart /></button>
                    </fetcher.Form>
                </div>
            )
            }
        </article >
    )
})

export function CartSkeleton({ count = 5 }) {
    return Array.from({ length: count }).map((_, i) => <div key={i} className='bg-white md:max-h-[60vh]  relative space-y-2 p-4'>
        <div className="flex items-center gap-2 justify-between w-full">
            <div className="w-10 h-5 bg-gray-50"></div>
            <div className='h-5 w-full bg-gray-50'></div>
        </div>
        <div className='flex flex-wrap flex-col justify-between relative'>
            <span className="absolute bottom-2 left-2"><ImSpinner2 className='stroke-primary animate-spin' /></span>
            <div className='flex-1 flex flex-wrap gap-3 items-center justify-between'>
                <div className='size-[200px] bg-gray-50'></div>
                <div className='space-y-4 flex-1 flex-col justify-end'>
                    <div className='h-6 w-3/6 bg-gray-50 ml-auto'></div>
                    <div className='h-10 w-1/4 bg-gray-50 ml-auto'></div>
                </div>
            </div>
            <div className='flex items-center justify-end gap-2 p-2'>
                <div className="bg-gray-50 w-5 h-5"></div>
                <div className="bg-gray-50 w-5 h-5"></div>
                <div className="bg-gray-50 w-5 h-5"></div>
            </div>
        </div>
    </div>
    )
}
