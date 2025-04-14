import {body} from "express-validator";
import {Router} from "express";

import userController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";

// @ts-ignore
const router = new Router();
router.post('/registration',
  body('email').isEmail(),
  body('age').isNumeric(),
  body('name').isLength({min: 3, max: 32}),
  body('password').isLength({min: 6, max: 32}),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/refresh', userController.refresh);
router.get('/me', authMiddleware, userController.me);

export default router
