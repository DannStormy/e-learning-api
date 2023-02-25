import { UserModel } from "../model/users/user.model";
import { IUser, IUserDocument } from "../model/users/user.types";
// interface updatedField {
//   name?: string,
//   quantity?: Number,
//   price?: Number,
//   descriptions?: string
// }
class UserService { 
  async createUser(user: IUser): Promise<void> {
    try {
      await UserModel.create(user)
    } catch (error) {
      throw error
    }
  }

  async findUser(username: string, email?: string) {
    try {
      return UserModel.findOne({$or: [{ username: username }, { email: email }]});
    } catch (error) {
      throw error
    }
  }
}

export default new UserService()