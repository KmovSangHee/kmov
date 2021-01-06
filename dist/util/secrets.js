"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === "production";
exports.MONGODB_URI = process.env.MONGODB_URL_LOCAL;
//export const MONGODB_URI = prod ? process.env.MONGODB_URI : process.env.MONGODB_URL_LOCAL;
// if(!MONGODB_URI){
//     if(prod){
//         logger.error("No Mongo connection string. Set MONGODB_URI environment variable.");
//     }else {
//         logger.error("No Mongo connection string. Set MONGODB_URI_LOCAL environment variable")
//     }
// }
//# sourceMappingURL=secrets.js.map