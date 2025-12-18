import mongoose, {Schema} from "mongoose";
import { UserType } from "@/types/UserType";

const UserSchema = new Schema<UserType> (
    {
        name:{
            type:String,
            required:[true,"Name is required"],
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true
        },
        password:{
            type:String,
            default:undefined,
            select:false, // by default it was not selected
        },
        provider:{type:String},
        providerId:{type:String}
    },
    {timestamps:true}
)

export const User = mongoose.models.User || mongoose.model<UserType>("User",UserSchema);