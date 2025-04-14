import {validationResult} from "express-validator";
import ApiException from "../exception/api.exception";
import {NextFunction, Request, Response} from "express";
import {setSuccessResponse} from "../utils";
import basketModel from "../model/basket.model";

type IRequestBasketDelete = {
  params: {
    id: string,
  }
}

type IRequestBasketAdd = {
  body: {
    id: number,
    quantity: number
  }
}

class BasketController {
  async add(req: IRequestBasketAdd, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при валидации', errors.array()))
      }

      const {id, quantity} = req.body
      
      const basket = await basketModel.add({id, quantity}) || []
      const sum = await basketModel.getSum()
      const oldSum = await basketModel.getOldSum()
      
      res.json(setSuccessResponse({
        sum,
        oldSum,
        items: basket
      }))
    } catch (e) {
      next(e);
    }
  }

  async delete(req: IRequestBasketDelete, res: Response, next: NextFunction) {
    try {
      const productId = +req.params.id
      await basketModel.delete({id: productId});
      const sum = await basketModel.getSum()
      const oldSum = await basketModel.getOldSum()
      
      return res.json(setSuccessResponse({
        sum,
        oldSum
      }));
    } catch (e) {
      next(e);
    }
  }
  
  async clear(req: IRequestBasketDelete, res: Response, next: NextFunction) {
    try {
      await basketModel.clear();

      return res.json(setSuccessResponse());
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const basketItems = await basketModel.findAll();
      const sum = await basketModel.getSum()
      const oldSum = await basketModel.getOldSum()
      
      return res.json(setSuccessResponse({
        sum,
        oldSum,
        items: basketItems,
      }));
    } catch (e) {
      next(e);
    }
  }
}

export default new BasketController()
