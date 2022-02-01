import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

//tests object versus schema
export function validateResource(schema: AnyZodObject){
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
    
            next();
        } catch (e: any) {
            console.log(e.errors)
            return res.status(400).send(e.errors);
        }
    };
}  