import {Router} from "express";
import * as bodyParser from "body-parser";

import exampleRouter from "./example";
import signRouter from "./sign";

const router = Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.use("/example", exampleRouter);

/**
 * @swagger
 * tags:
 *  name: Sign
 *  description: 회원가입/ 로그인 관련 기능 API
 */
router.use("/auth", signRouter);

export default router;