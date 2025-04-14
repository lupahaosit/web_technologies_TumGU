import DbService from "../service/db.service";

class ProductModel {
  static async findByIds(ids: number[]) {
    const db = await DbService.read()

    return db.products.filter(dbProduct => ids.includes(dbProduct.id))
  }

  static async getByQuery(query: string) {
    const db = await DbService.read()

    return db.products.filter(dbProduct => dbProduct.description.toLowerCase().includes(query.toLowerCase()))
  }
}

export default ProductModel
