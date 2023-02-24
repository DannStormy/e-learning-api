import { IInstructorDocument, IInstructorModel } from "./instructor.types";
export async function findOneOrCreate(
  instructorId: string
): Promise<IInstructorDocument> {
  const record = await this.findOne({ instructorId });
  if (record) {
    return record;
  } else {
    return this.create({ instructorId });
  }
}