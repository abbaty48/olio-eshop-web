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
    product?: TProduct;
    updatedOn: Date
}

export type TFetcher<T> = {
    payload: T,
    page: number,
    count: number,
    hasNextData: boolean,
    hasPreviousData: boolean,
}

export type Identity = Customer & Profile
