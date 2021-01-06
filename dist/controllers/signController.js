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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updatePassword = exports.requestSignUp = exports.signIn = void 0;
// import {generatePassword} from "../security/encryption";
const signService = __importStar(require("../services/sign.service"));
const commonService = __importStar(require("../services/common.service"));
const auth_1 = __importDefault(require("../models/responseCode/auth"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield signService.isValidUser(email);
        if (user) {
            const checkPassword = signService.isCorrectPassword(user, password);
            if (checkPassword) {
                const jwtToken = signService.generateJWTToken(email);
                return res.status(200).json(commonService.returnRequest(auth_1.default.SignInCode.SUCCESS, {
                    token: `${process.env.JWT_TOKEN_PREFIX} ${jwtToken}`,
                    userType: user.userType
                }));
            }
            else {
                return res.status(200).json(commonService.returnRequest(auth_1.default.SignInCode.MISMATCH, {
                    msg: "invalid user"
                }));
            }
        }
        else {
            return res.status(200).json(commonService.returnRequest(auth_1.default.SignInCode.MISMATCH, {
                msg: "Invalid user"
            }));
        }
    }
    catch (err) {
        res.status(500).json(commonService.returnRequest(auth_1.default.SignInCode.ERROR, {
            msg: "server error"
        }));
    }
});
exports.signIn = signIn;
const requestSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userName, password, userType, } = req.body;
    try {
        const isExistedEmail = yield signService.isExistedEmail(email);
        if (isExistedEmail) {
            res.status(200).json(commonService.returnRequest(auth_1.default.SignUpCode.DUPLICATE_ID, {
                msg: "exist user email",
            }));
        }
        else {
            const user = {
                email: email,
                password: password,
                userName: userName,
                userType: userType
            };
            yield signService.addNewUser(user);
            console.log("Success Add user");
            res.status(200).json(commonService.returnRequest(auth_1.default.SignUpCode.SUCCESS, {
                msg: "success request sign up",
            }));
        }
    }
    catch (err) {
        res.status(500).json(commonService.returnRequest(auth_1.default.SignUpCode.ERROR, { error: err.message }));
    }
});
exports.requestSignUp = requestSignUp;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield signService.isValidUser(email);
        if (user) {
            yield signService.assignNewPassword(user.email, password);
            return res.status(200).json(commonService.returnRequest(auth_1.default.ChangePasswordCode.SUCCESS, {
                msg: "success change password"
            }));
        }
        else {
            return res.status(400).json(commonService.returnRequest(auth_1.default.ChangePasswordCode.INVALID_REQUEST, {
                msg: ""
            }));
        }
    }
    catch (err) {
        return res.status(500).json(commonService.returnRequest(auth_1.default.ChangePasswordCode.ERROR, {
            msg: "err"
        }));
    }
});
exports.updatePassword = updatePassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield signService.isValidUser(email);
        if (user) {
            yield signService.deleteUser(user.email);
            return res.status(200).json(commonService.returnRequest(auth_1.default.DeleteUserCode.SUCCESS, {
                msg: "success delete user"
            }));
        }
        else {
            return res.status(400).json(commonService.returnRequest(auth_1.default.DeleteUserCode.INVALID_REQUEST, {
                msg: "user not found"
            }));
        }
    }
    catch (err) {
        return res.status(400).json(commonService.returnRequest(auth_1.default.DeleteUserCode.ERROR, {
            msg: "err"
        }));
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=signController.js.map