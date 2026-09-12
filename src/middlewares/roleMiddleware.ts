import type { NextFunction, Request, Response } from "express";

import { UserRole } from "../entities/User.js";
import { AppError } from "../utils/AppError.js";

export function roleMiddleware(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Acesso negado. Perfil não autorizado.", 403);
    }

    next();
  };
}
