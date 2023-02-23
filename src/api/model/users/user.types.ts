import { Document, Model } from "mongoose";
export interface IUser {
    username: String,
    email: String,
    password: String,
    type: String,
}

export interface IUserModel extends Model<IUserDocument> {
  findOneOrCreate: (
    {
      username,
      email,
      password,
      type
    }: { username: string; email: string; password: number, type: number }
  ) => Promise<IUserDocument>;
  // findByAge: (
  //   min?: number,
  //   max?: number
  // ) => Promise<IUserDocument[]>;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}