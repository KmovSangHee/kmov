import {Router} from "express";
import * as apiController from "../controllers/api";

const router = Router();

/**
 * @swagger
 *  /hello:
 *      get:
 *          summary: hello
 *          tags: [example]
 *          responses:
 *              200:
 *                  description: board of selected id column list
 */

router.get("/hello",apiController.getHello);

export default router;