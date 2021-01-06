import {Response,Request, NextFunction} from "express";
import {body, check, oneOf} from "express-validator";
import {UserType} from "../models/user.model";
import {checkInputValidation} from "./common";
import * as commonService from "../services/common.service";
import statusCode from "../models/responseCode/auth";

const PASSWORD_MATCH_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]/;

export const emailToLowerCase = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.email){
        req.body.email = String(req.body.email).toLowerCase().trim();
    }
    if(req.query.email){
        req.query.email = String(req.query.email).toLowerCase().trim();
    }
    next();
}

const generateEmailIfEmailIsNotExist = (req:Request, res:Response,next:NextFunction) => {
    if(!req.body.email){
        req.body.email = req.body.id;
    }
    next();
};

const checkUserType = (req:Request, res:Response, next: NextFunction) => {
    const userType: string = req.body.userType;
    if(userType in UserType){
        next();
    }else{
        return res.status(400).json(
            commonService.returnRequest(statusCode.SignUpCode.INVALID_REQUEST,{
                msg: `You should be use correct user type in [${Object.values(UserType)}]`,
            })
        )
    }
}

const isExistEmail = (req:Request, res: Response, next: NextFunction) => {
    if(req.body.email){
        next();
    }else{
        return res.status(400).json(
            commonService.returnRequest(statusCode.ChangePasswordCode.INVALID_REQUEST,{
                msg: "You should be send email or id",
            })
        );
    }
};

export const signValidationChains = [
    emailToLowerCase,
    check("email","email can not be empty").not().isEmpty(),
    check("password","password can not be empty").not().isEmpty(),
    checkInputValidation
]

export const signUpValidationChains = [
    emailToLowerCase,
    generateEmailIfEmailIsNotExist,
    body("email","email must be email type").if(body("email").exists()).isEmail(),
    check("password","password can not be empty").not().isEmpty(),
    check(
        "password",
        "password Length must be at least 8 characters and less than 16 characters."
    ).isLength({min:8, max:16}),
    check(
        "password",
        "password should be at least one letter, one number and one special character(@$.!%*#?&)"
    ).matches(PASSWORD_MATCH_REGEX),
    check("userName","userName can not be empty").not().isEmpty(),
	check("userType", "userType can not be empty").not().isEmpty(),
	checkUserType,
	checkInputValidation,
]

export const updatePasswordValidationChains = [
    emailToLowerCase,
    isExistEmail,
    check("password", "password can not be empty").not().isEmpty(),
    check("password","password Length must be at least 8 characters and less than 16 characters."
    ).matches(PASSWORD_MATCH_REGEX),
    checkInputValidation,
]

export const deleteUserValidationChains = [
    emailToLowerCase,
    checkInputValidation
]