export type TProduct = {
    id: string;
    name: string;
    price: number;
    desc?: string;
    feature: string;
    tag: string;
}

export type TCart = {
    cartId: string;
    productId: string;
    quantity: number;
    subPrice: number;
    addedOn: string;
    product?: TProduct;
}
