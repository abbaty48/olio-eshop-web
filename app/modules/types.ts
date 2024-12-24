import { Customer, Profile } from "@prisma/client";

export type TProduct = {
    [x: string]: any;
    id: string;
    sku: string;
    name: string;
    price: number;
    desc: string | null;
    feature: string;
    tag: string;
    color: string;
    material: string;
    category: string;
    cartId?: string;
}

export type TCart = {
    cartId: string;
    productId: string;
    quantity: number;
    subPrice: number;
    addedOn: Date;
    product?: TProduct | null;
    updatedOn: Date
    [key: string]: any
}

export type TFetcher<T> = {
    payload: T,
    page: number,
    count: number,
    hasNextData: boolean,
    hasPreviousData: boolean,
    recommendedProducts?: Promise<TProduct[]>
}

export type TCheckoutCart = TCart & { selected: boolean }

export type TShoppingCart = {
    carts: TCheckoutCart[],
    totalInCarts: number,
    totalPriceInCarts: number,
    totalQuantityInCarts: number,
    totalInCheckouts: number,
    totalPriceInCheckouts: number,
    totalQuantityInCheckouts: number,
}

export type Identity = Customer & Profile
