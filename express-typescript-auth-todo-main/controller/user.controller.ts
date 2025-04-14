import userService from "../service/user.service";
import {validationResult} from "express-validator";
import ApiException from "../exception/api.exception";
import {Request, Response, NextFunction} from "express";
import UserModel from "../model/user.model";
import {IRequestAuth} from "../middleware/auth.middleware";
import {setSuccessResponse} from "../utils";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiException.BadRequest('Ошибка при валидации', errors.array()))
            }

            const {email, password, age, name} = req.body;
            const userData = await userService.registration({email, password, age, name});
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(setSuccessResponse(userData));
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const user = await UserModel.findOne({email})
            if (!user) {
                return next(ApiException.UnauthorizedError())
            }
            const userData = await userService.login({email, password});
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(setSuccessResponse(userData));
        } catch (e) {
            next(e);
        }
    }

    async logout(req: IRequestAuth, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const userId = req.user.id
            await userService.logout(refreshToken, userId);
            res.clearCookie('refreshToken');
            return res.json(setSuccessResponse());
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(setSuccessResponse(userData));
        } catch (e) {
            next(e);
        }
    }

    async me(req: IRequestAuth, res: Response, next: NextFunction) {
        try {
            return res.json(setSuccessResponse({user: req.user}));
        } catch (e) {
            next(e);
        }
    }
}


export default new UserController();
