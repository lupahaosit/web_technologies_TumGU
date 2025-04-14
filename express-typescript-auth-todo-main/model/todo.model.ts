import DbService from "../service/db.service";
import {ITodo, ITodoAdd, ITodoUpdate, IUserModel} from "../type";
import {ITodoDelete, ITodoFindOne} from "../type/todo";
import ApiException from "../exception/api.exception";

class TodoModel {
  static async create({description, userId}: ITodoAdd) {
    const db = await DbService.read()

    const newTodo: ITodo = {
      id: db.todos.length,
      userId,
      description,
      completed: false
    }

    db.todos.push(newTodo)

    await DbService.write(db)

    return newTodo
  }

  static async findOne({id, userId}: ITodoFindOne) {
    const db = await DbService.read()

    return db.todos.find(dbTodo => dbTodo.id === id && dbTodo.userId === userId)
  }

  static async findAll(userId: IUserModel['id']) {
    const db = await DbService.read()
    return db.todos.filter(dbTodo => dbTodo.userId === userId)
  }

  static async update({id, userId, completed}: ITodoUpdate) {
    const db = await DbService.read()

    const todoIndex = db.todos.findIndex(dbTodo => dbTodo.id === id && dbTodo.userId === userId)
    const updatedTodo = Object.assign(db.todos[todoIndex], {})
    // if( completed == undefined){
    //   updatedTodo['completed'] = true
    // }else{
    // updatedTodo['completed'] = false
    // }
     
    updatedTodo['completed'] = completed

    // var status = completed.toString() == 'true' ? true : false
    
    db.todos[todoIndex] = updatedTodo

    await DbService.write(db)
  
    return updatedTodo
  }

  static async delete({id, userId}: ITodoDelete) {
    const db = await DbService.read()

    const todoIndex = db.todos.findIndex(dbTodo => dbTodo.id === id && dbTodo.userId === userId)
    if (todoIndex === -1) {
      throw ApiException.BadRequest('Не найдено todo с данным id')
    }
    const deletedTodo = Object.assign(db.todos[todoIndex], {})

    db.todos.splice(todoIndex, 1)

    await DbService.write(db)

    return deletedTodo
  }
}

export default TodoModel
