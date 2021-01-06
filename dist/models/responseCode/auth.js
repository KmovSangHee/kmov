"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignInCode;
(function (SignInCode) {
    SignInCode["SUCCESS"] = "SUCCESS";
    SignInCode["ERROR"] = "ERROR";
    SignInCode["MISMATCH"] = "MISMATCH";
    SignInCode["INVALID_REQUEST"] = "INVALID_REQUEST";
})(SignInCode || (SignInCode = {}));
var SignUpCode;
(function (SignUpCode) {
    SignUpCode["SUCCESS"] = "SUCCESS";
    SignUpCode["ERROR"] = "ERROR";
    SignUpCode["DUPLICATE_ID"] = "DUPLICATE_ID";
    SignUpCode["INVALID_REQUEST"] = "INVALID_REQUEST";
})(SignUpCode || (SignUpCode = {}));
var ChangePasswordCode;
(function (ChangePasswordCode) {
    ChangePasswordCode["SUCCESS"] = "SUCCESS";
    ChangePasswordCode["ERROR"] = "ERROR";
    ChangePasswordCode["INVALID_REQUEST"] = "INVALID_REQUEST";
    ChangePasswordCode["MISMATCH"] = "MISMATCH";
})(ChangePasswordCode || (ChangePasswordCode = {}));
var DeleteUserCode;
(function (DeleteUserCode) {
    DeleteUserCode["SUCCESS"] = "SUCCESS";
    DeleteUserCode["ERROR"] = "ERROR";
    DeleteUserCode["INVALID_REQUEST"] = "INVALID_REQUEST";
    DeleteUserCode["MISMATCH"] = "MISMATCH";
})(DeleteUserCode || (DeleteUserCode = {}));
exports.default = {
    SignInCode,
    SignUpCode,
    ChangePasswordCode,
    DeleteUserCode
};
//# sourceMappingURL=auth.js.map