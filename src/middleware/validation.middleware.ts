import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { logger } from '../utilities/logger';

//tests object versus schema
export function validateResource(schema: AnyZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
    
            next();
        } catch (err: any) {
            logger.log(err);
            
            return res.status(400).send(err.errors);
        }
    };
}  