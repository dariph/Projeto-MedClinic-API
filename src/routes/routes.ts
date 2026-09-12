import { Router } from "express";

import { AuthController } from "../controllers/AuthController.js";
import { UserController } from "../controllers/UserController.js";

import { UserRole } from "../entities/User.js";

import { createAuthMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";

import { UserRepository } from "../repositories/UserRepository.js";

import { AuthService } from "../services/AuthService.js";
import { UserService } from "../services/UserService.js";

import { createUserSchema, loginSchema } from "../schemas/userSchema.js";

const router = Router();

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const authService = new AuthService(userRepository);

const authController = new AuthController(userService, authService);

const userController = new UserController(userService);

const authMiddleware = createAuthMiddleware(authService);

router.post("/auth/register", validate(createUserSchema), (req, res) =>
  authController.register(req, res),
);

router.post("/auth/login", validate(loginSchema), (req, res) =>
  authController.login(req, res),
);

router.use(authMiddleware);

router.get("/users/me", (req, res) => userController.getMe(req, res));

router.get("/admin/ping", roleMiddleware([UserRole.ADMIN]), (req, res) =>
  userController.adminPing(req, res),
);

export { router };
