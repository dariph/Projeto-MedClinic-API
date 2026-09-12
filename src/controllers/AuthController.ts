import type { Request, Response } from "express";

import type { CreateUserDTO, LoginDTO } from "../dtos/UserDTO.js";

import { AuthService } from "../services/AuthService.js";
import { UserService } from "../services/UserService.js";

export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async register(req: Request, res: Response): Promise<Response> {
    const userData = req.body as CreateUserDTO;

    const user = await this.userService.create(userData);

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const loginData = req.body as LoginDTO;

    const authResponse = await this.authService.authenticate(loginData);

    return res.json(authResponse);
  }
}
