"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//import bluebird from "bluebird";
const mongoose_1 = __importDefault(require("mongoose"));
const secrets_1 = require("./util/secrets");
const router_1 = __importDefault(require("./router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
}).catch((err) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});
app.set("port", process.env.PORT);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/", router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map