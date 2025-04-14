import DbService from "../service/db.service";
import {IUser, IUserCreate, IUserModel} from "../type";

class UserModel {
    static async create(user: IUserCreate) {
        const db = await DbService.read()

        const {age, password, name, email} = user

        const newUser = {
            id: db.users.length,
            name,
            age,
            email,
            password
        }

        db.users.push(newUser)

        await DbService.write(db)

        return newUser
    }

    static async findOne({email}: {email: IUser['email']}) {
        const db = await DbService.read()

        return db.users.find(dbUser => dbUser.email === email)
    }

    static async findAll() {
        return await DbService.read()
    }

    static async findById(id: IUserModel['id']) {
        const db = await DbService.read()

        return db.users.find(dbUser => dbUser.id === id)
    }
}

export default UserModel
