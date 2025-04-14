import {validationResult} from "express-validator";
import ApiException from "../exception/api.exception";
import {NextFunction, Request, Response} from "express";
import {setSuccessResponse} from "../utils";
import {ICatalogOptions} from "../type/catalog";
import CatalogModel from "../model/catalog.model";

type IRequestProductGet = Request & {
    body: ICatalogOptions
}

class CatalogController {
    async getItems(req: IRequestProductGet, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiException.BadRequest('Ошибка при валидации', errors.array()))
            }
            
            const {page, limit, sort, filters, query} = req.body as ICatalogOptions

            const {items, pageCount} = await CatalogModel.getItems({page, limit, sort, filters, query})
            
            res.json(setSuccessResponse({
                items,
                pageCount
            }))
        } catch (e) {
            next(e);
        }
    }
    
    async getFilters(req: IRequestProductGet, res: Response, next: NextFunction) {
        try {
            res.json(setSuccessResponse({
                items: await CatalogModel.getFilters(),
            }))
        } catch (e) {
            next(e);
        }
    }
}

export default new CatalogController()
