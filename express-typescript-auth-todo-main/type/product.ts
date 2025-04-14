export interface IProduct {
    id: number
    image: string
    description: string
    price: number
    oldPrice?: number
}

export interface IProductItems {
    items: IProduct[]
    count: number
}
