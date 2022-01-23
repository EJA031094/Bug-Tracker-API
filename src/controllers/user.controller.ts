import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const userInput: User = req.body;

        return res.status(200).send(userInput);
    } catch(err: any) {
        console.log(err);
        return res.status(400).send(err);
    }
}
