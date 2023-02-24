import { StudentModel } from "../model/students/student.model";
import { IStudent, IStudentDocument } from "../model/students/student.types";
// interface updatedField {
//   name?: string,
//   quantity?: Number,
//   price?: Number,
//   descriptions?: string
// }
class StudentService { 
  async createStudent(student: IStudent): Promise<void> {
    try {
      await StudentModel.create(student)
    } catch (error) {
      throw error
    }
  }

  async findStudent(username: string, email: string) {
    try {
      return StudentModel.findOne({$or: [{ username: username }, { email: email }]});
    } catch (error) {
      throw error
    }
  }

//   async getClasses(): Promise<IClassDocument[]> {
//     try {
//       const cl = await ClassModel.find()
//       if (!cl) {
//         throw new Error("no records found")
//       }
//       return cl
//     } catch (error) {
//       throw error
//     }
//   }

//   async deleteProduct(productId: string): Promise<void> {
//     try {
//       await ProductModel.deleteOne({_id: productId});
//     } catch (error) {
//       throw error
//     }
//   }

//   async updateProduct(productId: string, prod: updatedField): Promise<void> {
//     try {
//       const product = await ProductModel.findById(productId);
//       if (!product) {
//         throw new Error("no record found")
//       }
//       await ProductModel.updateMany({_id: productId}, prod)
//     } catch (error) {
//       throw error
//     }
//   }

//   async totalClassCount(): Promise<number> {
//     try {
//       const count = await ClassModel.count()
//       if (!count) {
//         throw new Error("no record count")
//       }
//       return count
//     } catch (error) {
//       throw new Error("no record was found")
//     }
//   }
}

export default new StudentService()