import { InstructorModel } from "../model/instructors/instructor.model";
import { IInstructor, IInstructorDocument } from "../model/instructors/instructor.types";
// interface updatedField {
//   name?: string,
//   quantity?: Number,
//   price?: Number,
//   descriptions?: string
// }
class InstructorService { 
  async createInstructor(instructor: IInstructor): Promise<void> {
    try {
      await InstructorModel.create(instructor)
    } catch (error) {
      throw error
    }
  }

  async findInstructor(username: string, email: string) {
    try {
      return InstructorModel.findOne({$or: [{ username: username }, { email: email }]});
    } catch (error) {
      throw error
    }
  }
}

export default new InstructorService()