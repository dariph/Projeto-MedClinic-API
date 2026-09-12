import { z } from "zod";

import { UserRole } from "../entities/User.js";

export const createUserSchema = z.object({
  body: z.object({
    nome: z
      .string({
        error: "Nome é obrigatório.",
      })
      .min(3, "O nome deve ter no mínimo 3 caracteres."),

    email: z.email({
      error: "E-mail deve ser válido.",
    }),

    senha: z
      .string({
        error: "Senha é obrigatória.",
      })
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .regex(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra.")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número."),

    role: z.enum(UserRole).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email({
      error: "E-mail deve ser válido.",
    }),

    senha: z.string({
      error: "Senha é obrigatória.",
    }),
  }),
});
