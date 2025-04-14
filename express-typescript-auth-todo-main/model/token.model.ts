import DbService from "../service/db.service";
import {IToken, IUserModel} from "../type";

interface ITokenCreate {
    userId: IUserModel['id'],
    refreshToken: IToken['refreshToken']
}

class TokenModel {
    static async create({userId, refreshToken}: ITokenCreate) {
        const db = await DbService.read()

        const newToken = {
            id: db.tokens.length,
            userId,
            refreshToken
        }

        db.tokens.push(newToken)

        await DbService.write(db)

        return newToken
    }

    static async findOne(token: Partial<IToken>) {
        const db = await DbService.read()

        if (token.userId) {
            return db.tokens.find(dbToken => dbToken.userId === token.userId)
        } else if (token.refreshToken) {
            return db.tokens.find(dbToken => dbToken.refreshToken === token.refreshToken)
        }
    }

    static async delete(refreshToken: string) {
        const db = await DbService.read()

        const tokenIndex = db.tokens.findIndex(dbToken => dbToken.refreshToken === refreshToken)
        const deletedToken = Object.assign(db.tokens[tokenIndex], {})

        db.tokens = db.tokens.splice(tokenIndex, 1)

        await DbService.write(db)

        return deletedToken
    }

    static async save(token: IToken) {
        const db = await DbService.read()
        const tokenIndex = db.tokens.findIndex(dbToken => dbToken.id === token.id)
        db.tokens[tokenIndex] = token

        await DbService.write(db)

        return token
    }
}

export default TokenModel
