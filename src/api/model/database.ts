import mongoose  from "mongoose";
import { logger } from "../../config/logger";
import * as messages from '../../constants/messages'

// const  DB_URL: any = process.env.DB_URL;
// const DB_URL='mongodb+srv://Daniel:oUl7LwWXY5e99Wvk@e-learning.dyojhng.mongodb.net/?retryWrites=true&w=majority'
const DB_URL = 'mongodb://Daniel:oUl7LwWXY5e99Wvk@ac-qbt72in-shard-00-00.dyojhng.mongodb.net:27017,ac-qbt72in-shard-00-01.dyojhng.mongodb.net:27017,ac-qbt72in-shard-00-02.dyojhng.mongodb.net:27017/?ssl=true&replicaSet=atlas-13v8zr-shard-0&authSource=admin&retryWrites=true&w=majority'
export  const connect = async () => {
  try {
    await mongoose.connect(DB_URL);
    logger("info", `${messages.CURRENT_TIME_STAMP} Database Connected`);
  } catch (error: any) {
    logger("error", error.message);
    setTimeout(connect, 5000);
  }
};

// bfkqlbCcBqTEkaU6
// Daniel
// oUl7LwWXY5e99Wvk