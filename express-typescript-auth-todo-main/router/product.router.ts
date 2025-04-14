import {query} from "express-validator";
import {Router} from "express";

import productController from "../controller/product.controller";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const router: Router = new Router();
router.get('/',
    query('ids').isString(),
    productController.getByIds
);

export default router
