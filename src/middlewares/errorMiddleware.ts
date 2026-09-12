import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError.js";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("Erro não tratado:", err);

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor.",
  });
}
