import mongoose, {Schema, Document} from "mongoose";
import {UserSchemaName} from "./modelName";

export enum UserType {
    Normal = "Normal",
    Admin = "Admin",
}

export interface SignUpUserInfo {
    email: string;
    userName: string;
    password: string;
    userType: UserType;
}

export interface User extends Document{
    email:string;
    userName: string;
    password: string;
    userType: UserType;
    saltKey:string;
}

const UserSchema: Schema = new Schema(
    {
        email: {type:String,unique:true, required:true, index:true},
        userName: {type:String, required:true},
        password: {type:String, required: true},
        userType: {type:String, required:true},
        saltKey: {type:String,required:true}
    },
    {timestamps:true}
);

export default mongoose.model<User>(UserSchemaName, UserSchema);