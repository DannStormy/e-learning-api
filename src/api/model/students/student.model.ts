import { model } from "mongoose";
import { IStudentDocument } from "./student.types";
import studentSchema from "./student.schema";
export const StudentModel = model<IStudentDocument>("students", studentSchema);