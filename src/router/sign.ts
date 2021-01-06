import {Router} from "express";
import * as signController from "../controllers/signController";
import {
    signValidationChains,
    signUpValidationChains,
    updatePasswordValidationChains,
    deleteUserValidationChains
} from "../middleware/sign";

const router = Router();

router.post("/signin", signValidationChains, signController.signIn);
router.post("/signup", signUpValidationChains, signController.requestSignUp);
router.patch("/update-password", updatePasswordValidationChains, signController.updatePassword);
router.delete("/user/:email", deleteUserValidationChains, signController.deleteUser);


export default router;