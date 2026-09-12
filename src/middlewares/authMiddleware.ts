import type { NextFunction, Request, Response } from "express";

import { AuthService } from "../services/AuthService.js";
import { AppError } from "../utils/AppError.js";

export function createAuthMiddleware(authService: AuthService) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token JWT ausente.", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError("Token JWT ausente ou malformado.", 401);
    }

    const payload = authService.validateToken(token);

    req.user = {
      id: payload.id,
      role: payload.role,
    };

    next();
  };
}
