"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHello = exports.getApi = void 0;
const getApi = (req, res) => {
    res.render("api/index", {
        title: "API Examples",
    });
};
exports.getApi = getApi;
const getHello = (req, res) => {
    res.status(200).send("Hello");
};
exports.getHello = getHello;
//# sourceMappingURL=api.js.map