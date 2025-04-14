import {validationResult} from "express-validator";
import ApiException from "../exception/api.exception";
import {IRequestAuth} from "../middleware/auth.middleware";
import {NextFunction, Response} from "express";
import todoModel from "../model/todo.model";
import {setSuccessResponse} from "../utils";

type IRequestTodoGet = IRequestAuth & {
  params: {
    id: string,
  }
}

type IRequestTodoDelete = IRequestTodoGet

type IRequestTodoUpdate = IRequestAuth & {
  params: {
    id: string
  }
  body: {
    completed: boolean
  }
}


class TodoController {
  async add(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при валидации', errors.array()))
      }

      const { description } = req.body
      const userId = req.user.id
      const newTodo = await todoModel.create({description, userId})
      res.json(setSuccessResponse(newTodo))
    } catch (e) {
      next(e);
    }
  }

  async update(req: IRequestTodoUpdate, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при валидации', errors.array()))
      }

      const {id} = req.params
      const {completed} = req.body
      const userId = req.user.id
      const updatedTodo = await todoModel.update({userId, id: +id, completed});
      return res.json(setSuccessResponse(updatedTodo));
    } catch (e) {
      next(e);
    }
  }

  async delete(req: IRequestTodoDelete, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      const userId = req.user.id
      const deletedTodo = await todoModel.delete({userId, id});
      return res.json(setSuccessResponse(deletedTodo));
    } catch (e) {
      next(e);
    }
  }

  async get(req: IRequestTodoGet, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      const userId = req.user.id
      const todo = await todoModel.findOne({userId, id});
      return res.json(setSuccessResponse(todo));
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id
      const todos = await todoModel.findAll(userId);
      return res.json(setSuccessResponse(todos));
    } catch (e) {
      next(e);
    }
  }
}

export default new TodoController()
