import { model } from "mongoose";
import { IClassDocument } from "./class.types";
import classSchema from "./class.schema";
export const ClassModel = model<IClassDocument>("classes", classSchema);