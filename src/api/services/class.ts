import { ClassModel } from "../model/classes/class.model";
import { IClass, IClassDocument } from "../model/classes/class.types";

class ClassService { 
  async createClass(cl: IClass): Promise<void> {
    try {
      await ClassModel.create(cl)
    } catch (error) {
      throw error
    }
  }

  async getClass(classId: string): Promise<IClassDocument> {
    try {
      const cl = await ClassModel.findById(classId);
      if (!cl) {
        throw new Error("no class found")
      }
      return cl
    } catch (error) {
      throw error
    }
  }

  async getClasses(): Promise<IClassDocument[]> {
    try {
      const cl = await ClassModel.find()
      if (!cl) {
        throw new Error("no records found")
      }
      return cl
    } catch (error) {
      throw error
    }
  }

  async deleteClass(classId: string): Promise<void> {
    try {
      await ClassModel.deleteOne({_id: classId});
    } catch (error) {
      throw error
    }
  }

  async totalClassCount(): Promise<number> {
    try {
      const count = await ClassModel.count()
      if (!count) {
        throw new Error("no record count")
      }
      return count
    } catch (error) {
      throw new Error("no record was found")
    }
  }
}

export default new ClassService()