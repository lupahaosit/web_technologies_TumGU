import {body} from "express-validator";
import {Router} from "express";

import todoController from "../controller/todo.controller";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const router = new Router();
router.post('/',
  body('description').isLength({min: 1}),
  todoController.add
);
router.get('/:id', todoController.get);
router.get('/', todoController.getAll);
router.put('/:id',
  todoController.update
);
router.delete('/:id', todoController.delete);

export default router
