import {IProduct} from "./product";
import {ICategory, ICategoryItem} from "./categories";

export interface ICatalogOptions {
    page: number
    limit: number
    sort: 'alp' | 'price-up' | 'price-down'
    filters: ICatalogOptionsFilterItem[]
    query?: string
}

export type ICatalogOptionsFilterItem = {
    code: string
    type: 'checkbox' | 'range'
    items: string[]
}

export interface ICatalogItems {
    items: ICatalogItem[]
    pageCount: number
}

export type ICatalogItem = IProduct & {
    inBasket: boolean
}

export type IFilterItem = IFilterItemCheckbox | IFilterItemRange

interface IFilterItemCheckbox {
    title: ICategory['code']
    code: ICategoryItem['code'][keyof ICategoryItem['code']]
    type: 'checkbox'
    items: {
        title: ICategoryItem['title']
        code: ICategoryItem['code']
    }[]
}

interface IFilterItemRange {
    title: ICategory['code']
    code: ICategoryItem['code'][keyof ICategoryItem['code']]
    type: 'range'
    min: number
    max: number
}