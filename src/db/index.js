import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


export const connectDb = async () => {
    try {
        const connectionInstanse = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(" connectionInstanse : " + connectionInstanse.connection.host)
    } catch (error) {
        console.log(error  + ": " + error.message);
        throw error;
    }
};
