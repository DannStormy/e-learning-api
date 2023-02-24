import { Schema } from "mongoose";
import { findOneOrCreate } from "./instructor.statics";
import { toLower } from "../../../helpers";

const instructorSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  address: [{
    street_address: String,
    city: String,
    state: String,
    zip: String
  }],
  email: { 
    type: String, 
    set: toLower
  },
  classes: [{
    class_id: {
        type: Schema.Types.ObjectId
    },
    class_title: String
  }]
});

instructorSchema.statics.findOneOrCreate = findOneOrCreate;
export default instructorSchema;