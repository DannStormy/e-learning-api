import { Document, Model } from "mongoose";
export interface IInstructor {
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

export interface IInstructorModel extends Model<IInstructorDocument> {
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
  ) => Promise<IInstructorDocument>;
}
export interface IInstructorDocument extends IInstructor, Document {}
export interface IInstructorModel extends Model<IInstructorDocument> {}