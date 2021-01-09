import {Router} from "express";
import * as signController from "../controllers/signController";
import {
    signValidationChains,
    signUpValidationChains,
    updatePasswordValidationChains,
    deleteUserValidationChains
} from "../middleware/sign";

const router = Router();

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
router.post("/signin", signValidationChains, signController.signIn);

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
router.post("/signup", signUpValidationChains, signController.requestSignUp);

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
router.patch("/update-password", updatePasswordValidationChains, signController.updatePassword);

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
 *     responses:
 *       200:
 *         description: 유저 삭제 성공
 *       400:
 *         description: 유저 삭제 실패
 *       500:
 *         description: 서버 에러
 */
router.delete("/user/:email", deleteUserValidationChains, signController.deleteUser);


export default router;