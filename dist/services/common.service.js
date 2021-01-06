"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRequest = void 0;
const returnRequest = (status, msg) => {
    return {
        resultCode: status,
        data: msg
    };
};
exports.returnRequest = returnRequest;
//# sourceMappingURL=common.service.js.map