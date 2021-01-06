import jwt from "jsonwebtoken";
import userDB, {User,UserType,SignUpUserInfo} from "../models/user.model";
import {generateSaltKey, generatePassword} from "../security/encryption";

export const generateJWTToken = (email: string) => {
    return jwt.sign({email}, process.env.JWT_SECRET_KEY);
};

export const isExistedEmail = async (requestEmail: string) => {
    const isEmailExist = await userDB.findOne({email: requestEmail});
    return isEmailExist ? true : false;
}

export const addNewUser = async (user: SignUpUserInfo) => {
    const salt = generateSaltKey();
    const passwordHashCode = generatePassword(user.password, salt);
    await userDB.insertMany([
        {
            email:user.email,
            password:passwordHashCode,
            userName:user.userName,
            userType:user.userType,
            saltKey:salt,
        },
    ]);
};

export const isValidUser = async(email: string) => {
    const userResult = await userDB.findOne({email:email});
    return userResult;
}

export const isCorrectPassword = (user:User, password:string) => {
    if(user === null || user === undefined){
        return false;
    }
    const hashCode = generatePassword(password, user.saltKey);

    if(user.password === hashCode){
        return true;
    }else {
        return false;
    }
}

export const assignNewPassword = async(
    email:string,
    newPassword:string
) => {
    const salt = generateSaltKey();
    const passwordHashCode = generatePassword(newPassword, salt);
    const newUser = await userDB.updateOne(
        {email:email},
        {$set:{password:passwordHashCode, saltKey:salt}}
    );
}

export const deleteUser = async (email:string) => {
    if(email === null || email === undefined){
        return false;
    }
    const deleteUser = await userDB.deleteOne({email:email});
}