import { IStudentDocument, IStudentModel } from "./student.types";
export async function findOneOrCreate(
  studentId: string
): Promise<IStudentDocument> {
  const record = await this.findOne({ studentId });
  if (record) {
    return record;
  } else {
    return this.create({ studentId });
  }
}