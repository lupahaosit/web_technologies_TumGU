import {IUserModel} from "./user";

interface ITodo {
  id: number
  userId: IUserModel['id']
  description: string
  completed: boolean
}

interface ITodoAdd {
  userId: IUserModel['id']
  description: ITodo['description']
}

interface ITodoUpdate {
  id: number
  userId: IUserModel['id']
  completed: ITodo['completed']
}

interface ITodoFindOne {
  id: number
  userId: IUserModel['id']
}

interface ITodoDelete {
  id: number
  userId: IUserModel['id']
}

export {
  ITodo,
  ITodoAdd,
  ITodoUpdate,
  ITodoFindOne,
  ITodoDelete
}
