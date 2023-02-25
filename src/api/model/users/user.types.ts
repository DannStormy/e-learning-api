import { Document, Model } from "mongoose";
export interface IUser {
    username: string,
    email: string,
    password: string,
    type: string,
}

export interface IUserModel extends Model<IUserDocument> {
  findOneOrCreate: (
    {
      username,
      email,
      password,
      type
    }: { username: string; email: string; password: string, type: string }
  ) => Promise<IUserDocument>;
  // findByAge: (
  //   min?: number,
  //   max?: number
  // ) => Promise<IUserDocument[]>;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}