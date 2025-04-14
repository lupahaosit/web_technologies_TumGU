import {IProduct} from "./product";

export interface ICategoryProduct {
    id: number
    productId: IProduct['id']
    categoryId: number
    categoryItemId?: number
}

export interface ICategory {
    id: number
    code: string
    title: string
    type: 'checkbox' | 'range'
}

export interface ICategoryItem {
    id: number
    parentId: ICategory["id"]
    code: string
    title: string
}