import { Schema } from "mongoose";
import { findOneOrCreate } from "./class.statics";

const classSchema = new Schema({
  title: String,
  description: String,
  instructor: String,
  lessons: [{
    lesson_number: Number,
    lesson_title: String,
    lesson_body: String
  }]
});

classSchema.statics.findOneOrCreate = findOneOrCreate;
export default classSchema;