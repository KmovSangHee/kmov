"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidationChains = exports.updatePasswordValidationChains = exports.signUpValidationChains = exports.signValidationChains = exports.emailToLowerCase = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = require("../models/user.model");
const common_1 = require("./common");
const commonService = __importStar(require("../services/common.service"));
const auth_1 = __importDefault(require("../models/responseCode/auth"));
const PASSWORD_MATCH_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]/;
const emailToLowerCase = (req, res, next) => {
    if (req.body.email) {
        req.body.email = String(req.body.email).toLowerCase().trim();
    }
    if (req.query.email) {
        req.query.email = String(req.query.email).toLowerCase().trim();
    }
    next();
};
exports.emailToLowerCase = emailToLowerCase;
const generateEmailIfEmailIsNotExist = (req, res, next) => {
    if (!req.body.email) {
        req.body.email = req.body.id;
    }
    next();
};
const checkUserType = (req, res, next) => {
    const userType = req.body.userType;
    if (userType in user_model_1.UserType) {
        next();
    }
    else {
        return res.status(400).json(commonService.returnRequest(auth_1.default.SignUpCode.INVALID_REQUEST, {
            msg: `You should be use correct user type in [${Object.values(user_model_1.UserType)}]`,
        }));
    }
};
const isExistEmail = (req, res, next) => {
    if (req.body.email) {
        next();
    }
    else {
        return res.status(400).json(commonService.returnRequest(auth_1.default.ChangePasswordCode.INVALID_REQUEST, {
            msg: "You should be send email or id",
        }));
    }
};
exports.signValidationChains = [
    exports.emailToLowerCase,
    express_validator_1.check("email", "email can not be empty").not().isEmpty(),
    express_validator_1.check("password", "password can not be empty").not().isEmpty(),
    common_1.checkInputValidation
];
exports.signUpValidationChains = [
    exports.emailToLowerCase,
    generateEmailIfEmailIsNotExist,
    express_validator_1.body("email", "email must be email type").if(express_validator_1.body("email").exists()).isEmail(),
    express_validator_1.check("password", "password can not be empty").not().isEmpty(),
    express_validator_1.check("password", "password Length must be at least 8 characters and less than 16 characters.").isLength({ min: 8, max: 16 }),
    express_validator_1.check("password", "password should be at least one letter, one number and one special character(@$.!%*#?&)").matches(PASSWORD_MATCH_REGEX),
    express_validator_1.check("userName", "userName can not be empty").not().isEmpty(),
    express_validator_1.check("userType", "userType can not be empty").not().isEmpty(),
    checkUserType,
    common_1.checkInputValidation,
];
exports.updatePasswordValidationChains = [
    exports.emailToLowerCase,
    isExistEmail,
    express_validator_1.check("password", "password can not be empty").not().isEmpty(),
    express_validator_1.check("password", "password Length must be at least 8 characters and less than 16 characters.").matches(PASSWORD_MATCH_REGEX),
    common_1.checkInputValidation,
];
exports.deleteUserValidationChains = [
    exports.emailToLowerCase,
    common_1.checkInputValidation
];
//# sourceMappingURL=sign.js.map