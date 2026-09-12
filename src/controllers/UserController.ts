import type { Request, Response } from "express";

import { UserService } from "../services/UserService.js";
import { AppError } from "../utils/AppError.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getMe(req: Request, res: Response): Promise<Response> {
    if (!req.user) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    const user = await this.userService.findById(req.user.id);

    return res.json(user);
  }

  async adminPing(req: Request, res: Response): Promise<Response> {
    return res.json({
      message: "Ping do Administrador bem-sucedido!",
    });
  }
}
