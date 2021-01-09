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
const express_1 = require("express");
const bodyParser = __importStar(require("body-parser"));
const example_1 = __importDefault(require("./example"));
const sign_1 = __importDefault(require("./sign"));
const router = express_1.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
/**
 * @swagger
 * tags:
 *  name: example
 *  description: 테스트용
 */
router.use("/example", example_1.default);
/**
 * @swagger
 * tags:
 *  name: Sign
 *  description: 회원가입/ 로그인 관련 기능 API
 */
router.use("/auth", sign_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map