"use strict";
import {Response, Request, NextFunction} from "express";

// export const getApi = (req: Request, res: Response) => {
//     res.render("api/index", {
//         title: "API Examples",
//     });
// };

export const getHello = (req: Request, res: Response) => {
    res.status(200).send("Hello");
}