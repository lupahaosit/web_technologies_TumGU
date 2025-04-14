import {IUserModel} from "./user";
import {IToken} from "./token";
import {ITodo} from "./todo";
import {IProduct} from "./product";
import {IBasketItem} from "./basket";
import {ICategory, ICategoryItem, ICategoryProduct} from "./categories";

export interface IDb {
    users: IUserModel[]
    tokens: IToken[]
    todos: ITodo[]
    products: IProduct[]
    basket: IBasketItem[]
    categories: ICategory[]
    categoryItems: ICategoryItem[]
    categoryProductList: ICategoryProduct[]
}