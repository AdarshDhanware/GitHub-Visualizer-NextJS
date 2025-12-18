import { DB_NAME } from "@/constants/constants";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if(mongoose.connection && mongoose.connection.readyState) return;

        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(connectionInstance.connection.host);

        console.log("Mongo DB connected successfully ",connectionInstance.connection.name);

    } catch (error) {
        console.error(error);
        console.log("Mongo DB connection failed!!")
    }
}

