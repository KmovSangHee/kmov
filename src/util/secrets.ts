import logger from "./logger";
import dotenv from "dotenv";

dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

export const MONGODB_URI = process.env.MONGODB_URL_LOCAL;

//export const MONGODB_URI = prod ? process.env.MONGODB_URI : process.env.MONGODB_URL_LOCAL;

// if(!MONGODB_URI){
//     if(prod){
//         logger.error("No Mongo connection string. Set MONGODB_URI environment variable.");
//     }else {
//         logger.error("No Mongo connection string. Set MONGODB_URI_LOCAL environment variable")
//     }
// }