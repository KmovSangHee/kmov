"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.generateSaltKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateSaltKey = () => {
    const buf = crypto_1.default.randomBytes(32);
    return buf.toString("base64");
};
exports.generateSaltKey = generateSaltKey;
const generatePassword = (password, salt) => {
    const key = crypto_1.default.scryptSync(password, salt, 64, { N: 1024 }).toString("hex");
    return key;
};
exports.generatePassword = generatePassword;
//# sourceMappingURL=encryption.js.map