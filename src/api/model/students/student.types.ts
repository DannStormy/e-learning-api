import { Document, Model } from "mongoose";
export interface IStudent {
    first_name: String,
    last_name: String,
    username: String,
    address: [{
      street_address: String,
      city: String,
      state: String,
      zip: String
    }],
    email: String,
    classes: [{
      class_id: {
          type: String
      },
      class_title: String
    }]
}

export interface IStudentModel extends Model<IStudentDocument> {
  findOneOrCreate: (
    {
      first_name,
      last_name,
      username,
      address,
      email,
      classes
    }: { first_name: string; last_name: string; username: string, 
        address: [{street_address: string; city: string; state: string; zip: string}]; 
        email: string; classes: [{class_id: string; class_title: string}]}
  ) => Promise<IStudentDocument>;
}
export interface IStudentDocument extends IStudent, Document {}
export interface IStudentModel extends Model<IStudentDocument> {}