import express from "express";
import bodyParser from "body-parser";
//import bluebird from "bluebird";

import mongoose from "mongoose";
import {MONGODB_URI} from "./util/secrets";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import router from "./router";

import path from "path";
import dotnev from "dotenv";

dotnev.config();
 
const app = express();

const mongoUrl = MONGODB_URI;

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
}).then(() => {

}).catch((err) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});

app.set("port", process.env.PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const options = {
    swaggerDefinition:{
        info:{
            title: "Example API",
            version: "0.1.0",
            description: "Example API Server with Typescript"
        },
    },
    apis:[path.resolve(__dirname, "./router/*.ts")],
};

const specs = swaggerJSDoc(options);

app.use("/swagger",swaggerUi.serve, swaggerUi.setup(specs));
app.use("/",router);

export default app;