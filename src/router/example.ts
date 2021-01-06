import {Router} from "express";
import * as apiController from "../controllers/api";

const router = Router();

router.get("/hello",apiController.getHello);

export default router;