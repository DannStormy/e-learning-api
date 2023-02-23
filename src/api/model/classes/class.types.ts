import { Document, Model } from "mongoose";
export interface IClass {
    title: String,
    description: String,
    instructor: String,
    lessons: [{
      lesson_number: Number,
      lesson_title: String,
      lesson_body: String
    }]
}

export interface IClassModel extends Model<IClassDocument> {
  findOneOrCreate: (
    {
      title,
      description,
      instructor,
      lessons
    }: { title: string; description: string; instructor: number, lessons: [{lesson_number: number; lesson_title: string; lesson_body: string}] }
  ) => Promise<IClassDocument>;
  // findByAge: (
  //   min?: number,
  //   max?: number
  // ) => Promise<IUserDocument[]>;
}
export interface IClassDocument extends IClass, Document {}
export interface IClassModel extends Model<IClassDocument> {}