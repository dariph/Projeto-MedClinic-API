import bcrypt from "bcrypt";

import { User, UserRole } from "../entities/User.js";
import type { CreateUserDTO, UserResponseDTO } from "../dtos/UserDTO.js";
import { AppError } from "../utils/AppError.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { nome, email, senha, role } = data;

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("Este e-mail já está em uso.", 409);
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const userRole = role ?? UserRole.ATENDENTE;

    const user = await this.userRepository.create({
      nome,
      email,
      senha: hashedPassword,
      role: userRole,
    });

    await this.userRepository.save(user);

    return this.toResponse(user);
  }

  async findById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return this.toResponse(user);
  }

  private toResponse(user: User): UserResponseDTO {
    const { senha: _senha, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
