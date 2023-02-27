import { Document, Model } from "mongoose";
export interface IClass {
    title: string,
    description: string,
    instructor: string,
    lessons: [{
      lesson_number: number,
      lesson_title: string,
      lesson_body: string
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