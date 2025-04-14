import {Router} from "express";
import user from './user.router'
import todo from "./todo.router";
import product from "./product.router";
import basket from "./basket.router";
import catalog from "./catalog.router";

import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.use(user)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.use('/todo', authMiddleware, todo)
// router.use('/product', authMiddleware, product)
router.use('/product', product)
router.use('/basket', basket)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.use('/catalog', catalog)

export default router
