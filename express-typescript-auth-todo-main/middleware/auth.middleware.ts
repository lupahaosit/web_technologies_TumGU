import {Request, Response, NextFunction} from 'express'
import ApiException from "../exception/api.exception";
import tokenService from '../service/token.service';
import {IUserModel} from "../type";

export type IRequestAuth = Request & {
    user: IUserModel
}

export default function (req: IRequestAuth, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiException.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiException.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken) as IUserModel | null;
        if (!userData) {
            return next(ApiException.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        console.log(e)
        return next(ApiException.UnauthorizedError());
    }
}
