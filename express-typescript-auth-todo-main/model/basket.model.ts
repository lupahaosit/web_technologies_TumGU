import DbService from "../service/db.service";
import ApiException from "../exception/api.exception";
import {IBasketAdd, IBasketDelete, IBasketItem} from "../type/basket";

class BasketModel {
  static async add({id, quantity}: IBasketAdd) {
    const db = await DbService.read()
    
    if (quantity === 0) {
      return await BasketModel.delete({id})
    }

    const existBasketItem = db.basket.find(item => item.id === id)
    
    if (existBasketItem) {
      existBasketItem.count = quantity

      await DbService.write(db)

      return db.basket
    } else {
      const foundProduct = db.products.find(item => item.id === id)
          
      if (!foundProduct) {
        throw ApiException.BadRequest('Не найдено product с данным id')
      }
      
      const {image, description, price, oldPrice} = foundProduct
      
      const newBasketItem: IBasketItem = {
        id,
        count: quantity,
        description,
        image,
        oldPrice,
        price
      }
      
      db.basket.push(newBasketItem)

      await DbService.write(db)

      return db.basket
    }
  }

  static async findAll() {
    const db = await DbService.read()
    return db.basket
  }
  
  static async clear() {
    const db = await DbService.read()
    db.basket = []
    await DbService.write(db)
    return db.basket
  }
  
  static async delete({id}: IBasketDelete) {
    const db = await DbService.read()
    
    const foundBasketItem = db.basket.find(item => item.id === id)

    if (!foundBasketItem) {
      throw ApiException.BadRequest('Не найдено basket item с данным id')
    }

    db.basket = db.basket.filter(item => item !== foundBasketItem)

    await DbService.write(db)

    return db.basket
  }
  
  static async getSum(): Promise<number> {
    const db = await DbService.read()

    let sum = 0
    
    db.basket.forEach(item => {
      sum += item.price * item.count
    })

    return sum
  }

  static async getOldSum(): Promise<number> {
    const db = await DbService.read()
    let oldSum = 0

    db.basket.forEach(item => {
      oldSum += (item.oldPrice || item.price) * item.count
    })

    return oldSum
  }
}

export default BasketModel
