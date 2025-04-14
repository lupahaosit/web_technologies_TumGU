import {IUserModel} from "./user";

interface IToken {
  id: number
  userId: IUserModel['id']
  refreshToken: string
}

export {
  IToken
}
