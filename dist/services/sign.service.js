"use strict";
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
exports.deleteUser = exports.assignNewPassword = exports.isCorrectPassword = exports.isValidUser = exports.addNewUser = exports.isExistedEmail = exports.generateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const encryption_1 = require("../security/encryption");
const generateJWTToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET_KEY);
};
exports.generateJWTToken = generateJWTToken;
const isExistedEmail = (requestEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield user_model_1.default.findOne({ email: requestEmail });
    return isEmailExist ? true : false;
});
exports.isExistedEmail = isExistedEmail;
const addNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = encryption_1.generateSaltKey();
    const passwordHashCode = encryption_1.generatePassword(user.password, salt);
    yield user_model_1.default.insertMany([
        {
            email: user.email,
            password: passwordHashCode,
            userName: user.userName,
            userType: user.userType,
            saltKey: salt,
        },
    ]);
});
exports.addNewUser = addNewUser;
const isValidUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userResult = yield user_model_1.default.findOne({ email: email });
    return userResult;
});
exports.isValidUser = isValidUser;
const isCorrectPassword = (user, password) => {
    if (user === null || user === undefined) {
        return false;
    }
    const hashCode = encryption_1.generatePassword(password, user.saltKey);
    if (user.password === hashCode) {
        return true;
    }
    else {
        return false;
    }
};
exports.isCorrectPassword = isCorrectPassword;
const assignNewPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = encryption_1.generateSaltKey();
    const passwordHashCode = encryption_1.generatePassword(newPassword, salt);
    const newUser = yield user_model_1.default.updateOne({ email: email }, { $set: { password: passwordHashCode, saltKey: salt } });
});
exports.assignNewPassword = assignNewPassword;
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email === null || email === undefined) {
        return false;
    }
    const deleteUser = yield user_model_1.default.deleteOne({ email: email });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=sign.service.js.map