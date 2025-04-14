import DbService from "../service/db.service";
import {ICatalogItems, ICatalogOptions, IFilterItem} from "../type/catalog";
import {ICategory, ICategoryItem, ICategoryProduct} from "../type/categories";
import {IProduct} from "../type/product";
import {getPageCount} from "../utils";
import {IDb} from "../type/db";

class CatalogModel {
  static async getItems({page, limit, sort, filters, query}: ICatalogOptions): Promise<ICatalogItems> {
    const db = await DbService.read()

    const { categories, products, basket, categoryProductList, categoryItems } = db
    
    let usedProducts: IProduct[] = Array.from(products)
    
    let filteredProducts: ICatalogItems['items']
    
    if (query) {
      usedProducts = usedProducts.filter(product => product.description.includes(query))
    }

    if (filters.length) {
      filteredProducts = usedProducts.filter(product => {        
        let isItemInFilter = true
        const id = product.id

        for (let i = 0; i < filters.length; i++) {
          const filterItem = filters[i]
          
          if (filterItem.type === 'range') {
            const category = categories.find(item => item.code === filterItem.code)
            
            if (category && category.type === 'range') {
              const [min, max] = filterItem.items
              const product = products.find(product => product.id === id)

              if (!product) {
                return false
              }

              return product.price > +min && product.price < +max
            }
            
          } else if (filterItem.type === 'checkbox') {
            const {items} = filterItem

            if (!CatalogModel.isItemInCategory(filterItem.code, items, id, categories, categoryProductList, categoryItems)) {
              isItemInFilter = false
              break
            }
          }
        }

        return isItemInFilter
      }).map(product => ({
        ...product,
        inBasket: CatalogModel.isItemInBasket(product.id, basket)
      }))
    } else {
      filteredProducts = usedProducts.map(product => ({
        ...product,
        inBasket: CatalogModel.isItemInBasket(product.id, basket)
      }))
    }
    
    filteredProducts = filteredProducts.sort((a, b) => {
      if (sort === 'alp') {
        if (a.description > b.description) {
          return 1
        } else if (a.description < b.description) {
          return -1
        } else {
          return 0
        }
      } else if (sort === 'price-up') {
        if (a.price > b.price) {
          return 1
        } else if (a.price < b.price) {
          return -1
        } else {
          return 0
        }
      } else if (sort === 'price-down') {
        if (a.price < b.price) {
          return 1
        } else if (a.price > b.price) {
          return -1
        } else {
          return 0
        }
      } else {
        return 0
      }
    })
    
    const pageCount = getPageCount(limit, filteredProducts.length)
    
    filteredProducts = filteredProducts.slice((page - 1) * limit, page * limit)

    return {
      items: filteredProducts,
      pageCount
    }
  }

  static async getFilters(): Promise<IFilterItem[]> {
    const db = await DbService.read()

    const filters: IFilterItem[] = []

    db.categories.forEach(category => {
      const {id, title, code, type} = category
      
      if (type === 'checkbox') {
        const categoryItems = db.categoryItems.filter(categoryItem => categoryItem.parentId === id)

        const items = categoryItems.map(categoryItem => ({
          code: categoryItem.code,
          title: categoryItem.title
        }))

        filters.push({
          title,
          code,
          type,
          items,
        })
      } else if (type === 'range') {
        let min = 0
        let max = 0
        
        db.products.forEach(product => {
          if (!min || min > product.price) {
            min = product.price
          }
          
          if (!min || max < product.price) {
            max = product.price
          }
        })
        
        filters.push({
          title,
          code,
          type,
          min,
          max
        })
      }
    })
    
    return filters
  }

  private static isItemInCategory(
      categoryCode: ICategory['code'],
      categoryItemsCode: ICategoryItem['code'][],
      productId: IProduct['id'],
      categories: ICategory[], 
      categoryProductList: ICategoryProduct[], 
      categoryItems: ICategoryItem[]
  ): boolean {
    const category = categories.find(item => item.code === categoryCode)

    const foundCategoriesProduct = categoryProductList.filter(item => item.categoryId === category?.id && item.productId === productId)
    
    if (!foundCategoriesProduct.length) {
      return false
    }

    const foundCategoryItemsIds = categoryItems.filter(item => categoryItemsCode.includes(item.code)).map(item => item.id)
    return !!foundCategoriesProduct.filter(item => foundCategoryItemsIds.includes(item.categoryItemId!)).length
  }
  
  private static isItemInBasket(id: IProduct['id'], basket: IDb['basket']) {
    return !!basket.find(item => item.id === id)
  }
}

export default CatalogModel
