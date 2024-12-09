import { TbShoppingCartPlus } from "react-icons/tb";
import { Link, useFetcher } from "@remix-run/react";
import { TProduct } from "~/modules/types";

type TProps = {
    product: TProduct,
    size: 'small' | 'medium' | 'large'
}
export function Product({ product, size }: TProps) {
    const fetcher = useFetcher()
    const { id, name, desc, price, tag, feature } = product
    /*  */
    const SmallProduct = () => <article key={id} className={'col-span-1 flex flex-col justify-between bg-white p-5 text-[1.8rem] text-paragraph font-light md:max-h-[55vh]'}>
        <figure className="flex-1 flex flex-col gap-5">
            <img src={`/features/${feature}`} alt={desc ?? tag} className="place-self-center w-[200px] h-[200px]" width={200} height={200} />
            <figcaption className="space-y-5">
                <h2 className="text-xl uppercase text-black">{name}</h2>
                <p className="text-[1.4rem] md:line-clamp-1">{desc}</p>
                <p className="text-[1.2rem] md:line-clamp-1 text-pretty">{tag}</p>
            </figcaption>
        </figure>
        <div className="flex justify-between items-center">
            <p className="text-primary font-bold">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
            <fetcher.Form>
                {/* if added TbShoppingCartMinus */}
                {/* if error uses  TbShoppingCartExclamation*/}
                <button className="transition-all hover:stroke-primary hover:ring-1 hover:ring-primary p-4 hover:rounded-full"><TbShoppingCartPlus /></button>
            </fetcher.Form>
        </div>
    </article>
    /*  */
    const MediumProduct = () => <article key={id} className={'col-span-2 flex flex-col justify-between bg-white p-5 text-[1.8rem] text-paragraph font-light md:max-h-[55vh] '}>
        <figure className="flex flex-wrap md:flex-nowrap items-center gap-5">
            <img src={`/features/${feature}`} alt={desc ?? tag} className="place-self-center w-[200px] h-[200px]" width={200} height={200} />
            <figcaption>
                <h2 className="text-xl uppercase text-black">{name}</h2>
                <p className="">{desc}</p>
                <p className="text-[1.2rem]">{tag}</p>
            </figcaption>
        </figure>
        <div className="flex justify-between items-center">
            <p className="text-primary font-bold">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
            <fetcher.Form>
                {/* if added TbShoppingCartMinus */}
                {/* if error uses  TbShoppingCartExclamation*/}
                <button className="transition-all hover:stroke-primary hover:ring-1 hover:ring-primary p-4 hover:rounded-full"><TbShoppingCartPlus /></button>
            </fetcher.Form>
        </div>
    </article>
    /*  */
    const LargeProduct = () => <article key={id} className={'col-span-3 flex flex-col md:justify-center items-center justify-between bg-white p-5 text-[1.8rem] text-paragraph font-light md:max-h-[55vh]'}>
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
        <div className="col-span-3 flex w-full justify-between items-center">
            <p className=" text-primary font-bold">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
            <fetcher.Form>
                {/* if added TbShoppingCartMinus */}
                {/* if error uses  TbShoppingCartExclamation*/}
                <button className="transition-all hover:stroke-primary hover:ring-1 hover:ring-primary p-4 hover:rounded-full"><TbShoppingCartPlus /></button>
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

export function SearchProduct({ id, name, desc, price, feature }: TProduct) {
    return <Link key={id} to={`/products/${id}`}>
        <figure className="inline-flex flex-wrap items-center gap-5 py-6 px-4 hover:bg-white">
            <div className="flex flex-wrap items-center gap-5">
                <img src={`/features/${feature}`} alt={desc || name} className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]" width={200} height={200} />
                <span className="text-primary font-light text-xl md:text-[5rem]">
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)} </span>
            </div>
            <figcaption className="flex flex-wrap justify-between font-light text-xl md:text-[5rem] uppercase leading-[70px] break-words text-wrap whitespace-break-spaces">{name} </figcaption>
        </figure>
    </Link>
}
