import { Document } from "mongoose";

export interface UserType extends Document{
    name:string;
    email:string;
    password?:string | undefined;
    provider:"credentials" | "google";
    providerId:string;
    createdAt:Date;
    updatedAt:Date;
}