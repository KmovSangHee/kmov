import {Response, Request, NextFunction} from "express";
import {validationResult} from "express-validator";
import statusType from "../models/responseCode/auth";
import {returnRequest} from "../services/common.service";

export const checkInputValidation = (req: Request, res: Response, next: NextFunction) => {
    const checkInputError = validationResult(req).array({onlyFirstError:true})[0];
    if(checkInputError){
        return res.status(400).json(returnRequest(statusType.SignInCode.INVALID_REQUEST,{msg:checkInputError.msg}));
    }else{
        next();
    }
};