import {Response, Request} from "express";
import {SignUpUserInfo} from "../models/user.model";
// import {generatePassword} from "../security/encryption";

import * as signService from "../services/sign.service";
import * as commonService from "../services/common.service";
import statusType from "../models/responseCode/auth";

export const signIn = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try{
        const user = await signService.isValidUser(email);
        if(user){
            const checkPassword = signService.isCorrectPassword(user, password);   
            
            if(checkPassword){
                const jwtToken = signService.generateJWTToken(email);
                return res.status(200).json(
                    commonService.returnRequest(statusType.SignInCode.SUCCESS,{
                        token: `${process.env.JWT_TOKEN_PREFIX} ${jwtToken}`,
                        userType: user.userType
                    })
                );
            }else{
                return res.status(200).json(
                    commonService.returnRequest(statusType.SignInCode.MISMATCH,{
                        msg: "invalid user"
                    })
                )
            }
        }else{
            return res.status(200).json(
                commonService.returnRequest(statusType.SignInCode.MISMATCH,{
                    msg:"Invalid user"
                })
            )
        }
    }catch(err){
        res.status(500).json(
            commonService.returnRequest(statusType.SignInCode.ERROR,{
                msg:"server error"
            })
        );
    }
};

export const requestSignUp = async(req:Request, res:Response) => {
    const {
        email,
        userName,
        password,
        userType,
    } = req.body;
    try{
        const isExistedEmail = await signService.isExistedEmail(email);
        if(isExistedEmail){
            res.status(200).json(
                commonService.returnRequest(statusType.SignUpCode.DUPLICATE_ID,{
                    msg:"exist user email",
                })
            );
        }else{
            const user: SignUpUserInfo = {
                email:email,
                password:password,
                userName:userName,
                userType:userType
            };
            await signService.addNewUser(user);
            console.log("Success Add user");
            res.status(200).json(
                commonService.returnRequest(statusType.SignUpCode.SUCCESS,{
                    msg:"success request sign up",
                })
            );
        }
    }catch(err){
        res.status(500).json(commonService.returnRequest(statusType.SignUpCode.ERROR,{error:err.message}));
    }
};

export const updatePassword = async (req:Request, res:Response) => {
    const {email, password} = req.body;
    try{
        const user = await signService.isValidUser(email);
        if(user){
            await signService.assignNewPassword(user.email,password);
            return res.status(200).json(
                commonService.returnRequest(statusType.ChangePasswordCode.SUCCESS,{
                    msg: "success change password"
                })
            );
        }else{
            return res.status(400).json(
                commonService.returnRequest(statusType.ChangePasswordCode.INVALID_REQUEST,{
                    msg:""
                })
            );
        }
    }catch(err){
        return res.status(500).json(
            commonService.returnRequest(statusType.ChangePasswordCode.ERROR,{
                msg:"err"
            }) 
        )
    }
};

export const deleteUser = async (req:Request, res:Response) => {
    const {email} = req.params;
    try{
        const user = await signService.isValidUser(email);
        if(user){
            await signService.deleteUser(user.email);
            return res.status(200).json(
                commonService.returnRequest(statusType.DeleteUserCode.SUCCESS,{
                    msg:"success delete user"
                })
            )
        }else{
            return res.status(400).json(
                commonService.returnRequest(statusType.DeleteUserCode.INVALID_REQUEST,{
                    msg:"user not found"
                })
            )
        }
    }catch(err){
        return res.status(400).json(
            commonService.returnRequest(statusType.DeleteUserCode.ERROR,{
                msg:"err"
            })
        )
    }
}