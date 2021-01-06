"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInputValidation = void 0;
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../models/responseCode/auth"));
const common_service_1 = require("../services/common.service");
const checkInputValidation = (req, res, next) => {
    const checkInputError = express_validator_1.validationResult(req).array({ onlyFirstError: true })[0];
    if (checkInputError) {
        return res.status(400).json(common_service_1.returnRequest(auth_1.default.SignInCode.INVALID_REQUEST, { msg: checkInputError.msg }));
    }
    else {
        next();
    }
};
exports.checkInputValidation = checkInputValidation;
//# sourceMappingURL=common.js.map