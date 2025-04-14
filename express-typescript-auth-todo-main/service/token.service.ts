import jwt from "jsonwebtoken";

import tokenModel from '../model/token.model';
import {IUserCreate, IUserModel} from "../type";

class TokenService {
    generateTokens(payload: IUserCreate) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '2h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: '60d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(accessToken: string) {
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    async saveToken(userId: IUserModel['id'], refreshToken: string) {
        const tokenData = await tokenModel.findOne({userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenModel.save(tokenData)
            // return tokenData.save();
        }
        return await tokenModel.create({userId, refreshToken});
    }

    async removeToken(refreshToken: string) {
        return await tokenModel.delete(refreshToken);
    }

    async findToken(refreshToken: string) {
        return await tokenModel.findOne({refreshToken});
    }
}

export default new TokenService();
