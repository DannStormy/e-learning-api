import { model } from "mongoose";
import { IInstructorDocument } from "./instructor.types";
import instructorSchema from "./instructor.schema";
export const InstructorModel = model<IInstructorDocument>("instructors", instructorSchema);