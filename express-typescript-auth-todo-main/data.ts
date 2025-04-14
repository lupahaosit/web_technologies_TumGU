import {IProduct} from "./type/product";
import {ICategory, ICategoryItem, ICategoryProduct,} from "./type/categories";
/* eslint-disable */

export const categories: ICategory[] = [
    {
        id: 0,
        title: 'Категория',
        code: 'category',
        type: 'checkbox'
    },
    {
        id: 1,
        title: 'Бренд',
        code: 'brand',
        type: 'checkbox'
    },
    {
        id: 2,
        title: 'Цена',
        code: 'price',
        type: 'range'
    }
]

export const categoryItems: ICategoryItem[] = [
    {
        id: 0,
        parentId: 0,
        code: 'gornie',
        title: 'Горные'
    },
    {
        id: 1,
        parentId: 0,
        code: 'gorodskie',
        title: 'Городские'
    },
    {
        id: 2,
        parentId: 0,
        code: 'fat',
        title: 'Фэтбайки'
    },
    {
        id: 3,
        parentId: 0,
        code: 'dvuhpodvesnie',
        title: 'Двухподвесные'
    },
    {
        id: 4,
        parentId: 0,
        code: 'detskie',
        title: 'Детские'
    },
    {
        id: 5,
        parentId: 0,
        code: 'jenskie',
        title: 'Женские'
    },
    {
        id: 6,
        parentId: 1,
        code: 'cube',
        title: 'CUBE'
    },
    {
        id: 7,
        parentId: 1,
        code: 'merida',
        title: 'MERIDA'
    },
    {
        id: 8,
        parentId: 1,
        code: 'superior',
        title: 'SUPERIOR'
    },
    {
        id: 9,
        parentId: 1,
        code: 'bergamont',
        title: 'BERGAMONT'
    },
    {
        id: 10,
        parentId: 1,
        code: 'specialized',
        title: 'SPECIALIZED'
    },
    {
        id: 11,
        parentId: 1,
        code: 'kona',
        title: 'KONA'
    },
    {
        id: 12,
        parentId: 1,
        code: 'pride',
        title: 'PRIDE'
    },
]

const {productsFill, categoryProductListFill} = fillItems()

export const products: IProduct[] = productsFill

export const categoryProductList: ICategoryProduct[] = categoryProductListFill

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillItems() {
    function getRandomCategory() {
        let categories2 = Array.from(categoryItems).filter(item => item.parentId === 1)

        return categories2[getRandomIntInclusive(0, categories2.length - 1)]
    }

    function getRandomCategoryBrands() {
        const categoriesLen = getRandomIntInclusive(1, 4)

        let categoryItems2 = Array.from(categoryItems).filter(item => item.parentId === 0)

        const categories2 = []

        for (let i = 0; i < categoriesLen; i++) {
            const randomNum = getRandomIntInclusive(0, categoryItems2.length - 1)
            if (categoryItems2[randomNum]) {
                categories2.push(categoryItems2[randomNum])
                categoryItems2.splice(randomNum, 1)
            }
        }

        return categories2
    }

    function copy(value: any) {
        return JSON.parse(JSON.stringify(value))
    }

    const productsFill: IProduct[] = []
    const categoryProductListFill: ICategoryProduct[] = []
    let categoryProductListId = 0

    for (let i = 0; i < 300; i++) {
        const category2: ICategoryItem = copy(getRandomCategory())
        const categoryItems2: ICategoryItem[] = copy(getRandomCategoryBrands())

        const description = copy(`${category2.title} ${categoryItems2.map(item => item.title).join(' ')}`)

        const hasOldPrice = Math.random() < 0.2
        
        const productItem: IProduct = {
            id: i,
            description,
            image: `${process.env.API_URL}/upload/products/product${getRandomIntInclusive(1, 4)}.png`,
            price: getRandomIntInclusive(1, 60) * 1000
        }
        
        if (hasOldPrice) {
            productItem.oldPrice = productItem.price + getRandomIntInclusive(1, 20) * 1000
        }
        
        productsFill.push(productItem)

        categoryProductListFill.push({
            id: categoryProductListId++,
            productId: i,
            categoryId: category2.parentId,
            categoryItemId: category2.id
        })

        for (let j = 0; j < categoryItems2.length; j++) {
            categoryProductListFill.push({
                id: categoryProductListId++,
                productId: i,
                categoryId: categoryItems2[j].parentId,
                categoryItemId: categoryItems2[j].id
            })
        }
    }
    
    return {
        productsFill, 
        categoryProductListFill
    }
}
