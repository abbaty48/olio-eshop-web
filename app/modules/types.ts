export type TProduct = {
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
