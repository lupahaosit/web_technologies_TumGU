import asyncFs from 'fs/promises'
import fs from 'fs'
import {IDb} from "../type/db";
import {categories, categoryItems, categoryProductList, products} from "../data";
import {EOL} from "os";

const dbPath = './db.json'
const loggerPath = './logger/log.txt'
const initialDb: IDb = {
  users: [],
  tokens: [],
  todos: [],
  basket: [],
  categories,
  categoryItems,
  products,
  categoryProductList,
}

class DbService {
  static async read(): Promise<IDb> {
    try {
      if (!fs.existsSync(dbPath)) {
        await DbService.create()
      }
      const db = await asyncFs.readFile(dbPath)
      return JSON.parse(db.toString())
    } catch (e) {
      await DbService.setError(e)
      
      fs.unlinkSync(dbPath);
      await DbService.create()
      
      const db = await asyncFs.readFile(dbPath)
      return JSON.parse(db.toString())
    }
  }

  static async write(data: IDb) {
    await asyncFs.writeFile(dbPath, JSON.stringify(data))
  }

  static async create() {
    await asyncFs.writeFile(dbPath, JSON.stringify(initialDb))
  }
  
  static async setError(e: any) {
    const message = `${new Date().toString()} ${JSON.stringify(e && e.message || 'Unknown error')} ${EOL}`
    
    if (!fs.existsSync(loggerPath)) {
      await asyncFs.writeFile(loggerPath, message)
    } else {
      await asyncFs.appendFile(loggerPath, message)
    }
  }
}

export default DbService
