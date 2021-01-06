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
router.post("/signin", sign_1.signValidationChains, signController.signIn);
router.post("/signup", sign_1.signUpValidationChains, signController.requestSignUp);
router.patch("/update-password", sign_1.updatePasswordValidationChains, signController.updatePassword);
router.delete("/user/:email", sign_1.deleteUserValidationChains, signController.deleteUser);
exports.default = router;
//# sourceMappingURL=sign.js.map