import { IClassDocument, IClassModel } from "./class.types";
export async function findOneOrCreate(
  classId: string
): Promise<IClassDocument> {
  const record = await this.findOne({ classId });
  if (record) {
    return record;
  } else {
    return this.create({ classId });
  }
}