import type { UserRole } from "../entities/User.js";

export interface CreateUserDTO {
  nome: string;
  email: string;
  senha: string;
  role?: UserRole;
}

export interface UserResponseDTO {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface AuthResponseDTO {
  token: string;
  user: UserResponseDTO;
}
