import {IProduct} from "./product";

export interface IBasketItem {
    id: IProduct["id"]
    description: IProduct["description"]
    image: IProduct["image"]
    price: IProduct["price"]
    oldPrice?: IProduct["oldPrice"]
    count: number
}

export interface IBasketAdd {
    id: IProduct['id']
    quantity: number
}

export interface IBasketDelete {
    id: IProduct['id']
}
