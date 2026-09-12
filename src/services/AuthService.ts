import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { z } from "zod";

import { UserRole } from "../entities/User.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { AppError } from "../utils/AppError.js";
import { getEnvVar } from "../utils/env.js";

import type {
  AuthResponseDTO,
  LoginDTO,
  UserResponseDTO,
} from "../dtos/UserDTO.js";

const tokenPayloadSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(UserRole),
});

export interface TokenPayload {
  id: string;
  role: UserRole;
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(data: LoginDTO): Promise<AuthResponseDTO> {
    const { email, senha } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const expiresIn: NonNullable<SignOptions["expiresIn"]> =
      (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h";

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      getEnvVar("JWT_SECRET"),
      {
        expiresIn,
      },
    );

    const { senha: _senha, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword as UserResponseDTO,
    };
  }

  validateToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, getEnvVar("JWT_SECRET"));

      const result = tokenPayloadSchema.safeParse(decoded);

      if (!result.success) {
        throw new AppError("Token JWT inválido.", 401);
      }

      return {
        id: result.data.id,
        role: result.data.role,
      };
    } catch {
      throw new AppError("Token JWT inválido ou expirado.", 401);
    }
  }
}
