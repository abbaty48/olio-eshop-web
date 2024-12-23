import { TbShoppingCartCheck, TbShoppingCartExclamation, TbShoppingCartPlus } from "react-icons/tb";
import { Link, useFetcher } from "@remix-run/react";
import { TProduct } from "~/modules/types";

type TProps = {
    product: TProduct,
    size: 'small' | 'medium' | 'large'
}

export function Product({ product, size }: TProps) {
    const fetcher = useFetcher<{ success: boolean }>()
    const { id, name, desc, price, tag, feature, cartId } = product
    const cartProcessing = fetcher.state !== 'idle';
    const inCart = Boolean(cartId) === true;
    /*  */
    const addAction = `/carts/add/1/${price}/${id}`
    const removeAction = `/carts/remove/${cartId}`
    /*  */
    const SmallProduct = () => <article key={id} className={'col-span-1 flex flex-col justify-between bg-white text-[1.8rem] text-paragraph font-light divide-y divide-gray-100'}>
        <Link to={`/product/${id}`} className="p-2">
            <figure className="flex-1 flex flex-col gap-5">
                <img src={`/features/${feature}`} alt={desc ?? tag} className="place-self-center w-[200px] h-[200px]" width={200} height={200} />
                <figcaption className="space-y-5">
                    <h2 className="text-xl uppercase text-black">{name}</h2>
                    <p className="text-[1.4rem] md:line-clamp-1">{desc}</p>
                    {/* <p className="text-[1.2rem] md:line-clamp-1 text-pretty">{tag}</p> */}
                </figcaption>
            </figure>
        </Link>
        <div className="flex justify-between items-center p-2">
            <p className="text-primary font-bold">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
            <fetcher.Form title={inCart === true ? 'Remove from your cart list.' : 'Add to your cart list.'} role="radio" method="PUT" action={inCart ? removeAction : addAction}>
                <button disabled={cartProcessing} className="transition-all hover:stroke-primary hover:ring-1 hover:ring-primary p-4 hover:rounded-full" aria-label="add the product to your card/remove the product from your cart">
                    {
                        (cartProcessing) ? <TbShoppingCartExclamation /> :
                            inCart ? <TbShoppingCartCheck className="stroke-primary" /> :
                                <TbShoppingCartPlus />
                    }
                </button>
            </fetcher.Form>
        </div>
    </article >
    /*  */
    const MediumProduct = () => <article key={id} className={'col-span-2 flex flex-col justify-between bg-white text-[1.8rem] text-paragraph font-light md:max-h-[60vh] divide-y divide-gray-100'}>
        <Link to={`/product/${id}`} className="p-2">
            <figure className="flex flex-wrap md:flex-nowrap items-center gap-5">
                <img src={`/features/${feature}`} alt={desc ?? tag} className="place-self-center w-[200px] h-[200px]" width={200} height={200} />
                <figcaption>
                    <h2 className="text-xl uppercase text-black">{name}</h2>
                    <p className="">{desc}</p>
                    <p className="text-[1.2rem]">{tag}</p>
                </figcaption>
            </figure>
        </Link>
        <div className="flex justify-between items-center p-2">
            <p className="text-primary font-bold">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
            <fetcher.Form title={inCart === true ? 'Remove from your cart list.' : 'Add to your cart list.'} role="radio" method="PUT" action={inCart ? removeAction : addAction}>
                <button disabled={cartProcessing} className="transition-all hover:stroke-primary hover:ring-1 hover:ring-primary p-4 hover:rounded-full" aria-label="add the product to your card/remove the product from your cart">
                    {
                        (cartProcessing) ? <TbShoppingCartExclamation /> :
                            inCart ? <TbShoppingCartCheck className="stroke-primary" /> :
                                <TbShoppingCartPlus />
                    }
                </button>
            </fetcher.Form>
        </div>
    </article>
    /*  */
    const LargeProduct = () => <article key={id} className={'col-span-3 flex flex-col justify-between bg-white  text-[1.8rem] text-paragraph font-light md:max-h-[60vh] divide-y divide-gray-100'}>
        <Link to={`/product/${id}`} className="p-2">
            <figure className="flex flex-col md:flex-row items-center gap-5">
                <div className="md:max-w-[400px] md:max-h-[250px] col-span-2 place-self-center object-center">
                    <img src={`/features/${feature}`} alt={desc ?? tag} className="md:w-auto md:h-auto md:max-w-[400px] md:max-h-[250px]" width={200} height={200} />
                </div>
                <figcaption className="space-y-5">
                    <h2 className="text-xl uppercase text-black">{name}</h2>
                    <p className="">{desc}</p>
                    <p className="text-[1.2rem]">{tag}</p>
                </figcaption>
            </figure>
        </Link>
        <div className="col-span-3 flex  justify-between items-center p-2">
            <p className=" text-primary font-bold">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
            <fetcher.Form title={inCart === true ? 'Remove from your cart list.' : 'Add to your cart list.'} role="radio" method="PUT" action={inCart ? removeAction : addAction}
            >
                <button disabled={cartProcessing} className="transition-all hover:stroke-primary hover:ring-1 hover:ring-primary p-4 hover:rounded-full" aria-label="add the product to your card/remove the product from your cart">
                    {
                        (cartProcessing) ? <TbShoppingCartExclamation /> :
                            inCart ? <TbShoppingCartCheck className="stroke-primary" /> :
                                <TbShoppingCartPlus />
                    }
                </button>
            </fetcher.Form>
        </div>
    </article>

    return (() => {
        switch (size) {
            case 'small': return <SmallProduct />;
            case 'medium': return <MediumProduct />
            case 'large': return <LargeProduct />
        }
    })()
}
