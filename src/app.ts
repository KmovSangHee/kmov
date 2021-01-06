import express from "express";
import bodyParser from "body-parser";
//import bluebird from "bluebird";

import mongoose from "mongoose";
import {MONGODB_URI} from "./util/secrets";

import router from "./router";

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
})

app.set("port", process.env.PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/",router);

export default app;