import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

import { AppError } from "../utils/AppError.js";

export function validate(schema: ZodType) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");

        throw new AppError(`Erro de validação: ${messages}`, 400);
      }

      next(error);
    }
  };
}
