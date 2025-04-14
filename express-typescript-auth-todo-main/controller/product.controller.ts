import {validationResult} from "express-validator";
import ApiException from "../exception/api.exception";
import {NextFunction, Request, Response} from "express";
import ProductModel from "../model/product.model";
import {setSuccessResponse} from "../utils";

type IRequestProductGet = Request & {
    query: {
        ids: string,
    }
}

class ProductController {
    async getByIds(req: IRequestProductGet, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiException.BadRequest('Ошибка при валидации', errors.array()))
            }
            
            const idsString = req.query.ids
            const ids = idsString.split(',').map(id => +id)
            
            const foundProducts = await ProductModel.findByIds(ids)
            res.json(setSuccessResponse(foundProducts))
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController()
