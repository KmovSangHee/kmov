"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHello = void 0;
// export const getApi = (req: Request, res: Response) => {
//     res.render("api/index", {
//         title: "API Examples",
//     });
// };
const getHello = (req, res) => {
    res.status(200).send("Hello");
};
exports.getHello = getHello;
//# sourceMappingURL=api.js.map