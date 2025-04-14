interface IUser {
  name: string
  age: number
  email: string
  password: string
}

interface IUserModel extends IUser {
  id: number
}
type IUserCreate = IUser

type IUserRegister = IUser

interface IUserLogin {
  email: IUser['email']
  password: IUser['password']
}

export {
  IUser,
  IUserModel,
  IUserCreate,
  IUserRegister,
  IUserLogin,
}
