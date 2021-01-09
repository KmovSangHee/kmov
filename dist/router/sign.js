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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signController = __importStar(require("../controllers/signController"));
const sign_1 = require("../middleware/sign");
const router = express_1.Router();
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: 로그인 기능
 *     tags: [Sign]
 *     parameters:
 *     - in: body
 *       description: 로그인을 위한 정보 전달
 *       schema:
 *         type: object
 *         required:
 *         - id
 *         - password
 *         properties:
 *           id:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       400:
 *         description: 로그인 실패
 *       500:
 *         description: 서버에러
 */
router.post("/signin", sign_1.signValidationChains, signController.signIn);
/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: 회원가입 기능
 *    tags: [Sign]
 *    parameters:
 *      - in: body
 *        description: 회원가입을 위한 정보 전달
 *        schema:
 *          type: object
 *          required:
 *          - email
 *          - password
 *          - userName
 *          - userType
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            userName:
 *              type: string
 *            userType:
 *              type: string
 *    responses:
 *      200:
 *        description: 회원가입 성공
 *      400:
 *        description: 로그인 실패
 *      500:
 *        description: 서버 에러
 */
router.post("/signup", sign_1.signUpValidationChains, signController.requestSignUp);
/**
 * @swagger
 * /auth/update-password:
 *   patch:
 *     summary: 비밀번호 변경
 *     tags: [Sign]
 *     parameters:
 *       - in: body
 *         description: 비밀번호 변경을 위한 정보 전달
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: 비밀번호 변경 성공
 *       400:
 *         description: 비밀번호 변경 실패
 *       500:
 *         description: 서버 에러
 */
router.patch("/update-password", sign_1.updatePasswordValidationChains, signController.updatePassword);
/**
 * @swagger
 * /auth/user/{email}:
 *   delete:
 *     summary: 유저 삭제
 *     tags: [Sign]
 *     parameters:
 *       - in: paths
 *         description: 유저 삭제를 위한 정보 전달
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: 유저 삭제 성공
 *       400:
 *         description: 유저 삭제 실패
 *       500:
 *         description: 서버 에러
 */
router.delete("/user/:email", sign_1.deleteUserValidationChains, signController.deleteUser);
exports.default = router;
//# sourceMappingURL=sign.js.map