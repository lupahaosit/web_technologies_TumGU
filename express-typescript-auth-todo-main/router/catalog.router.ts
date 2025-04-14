import {Router} from "express";

import catalogController from "../controller/catalog.controller";
import {body} from "express-validator";

// @ts-ignore
const router = new Router();
router.post('/',
    body('page').isNumeric(),
    body('limit').isNumeric(),
    body('sort').isString(),
    body('filters').isArray(),
    catalogController.getItems
);
router.get('/filters',
    catalogController.getFilters
);

export default router
