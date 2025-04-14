import {body, param} from "express-validator";
import {Router} from "express";

import basketController from "../controller/basket.controller";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const router: Router = new Router();
router.post('/',
  body('id').isNumeric(),
  body('quantity').isNumeric(),
  basketController.add
);
router.get('/', basketController.getAll);
router.get('/clear', basketController.clear);
router.delete('/:id',
    param('id').isString(),
    basketController.delete
);

export default router
