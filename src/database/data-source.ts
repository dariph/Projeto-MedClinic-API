import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "../entities/User.js";
import { getEnvVar } from "../utils/env.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",

  host: getEnvVar("DB_HOST"),
  port: Number(getEnvVar("DB_PORT")),
  username: getEnvVar("DB_USER"),
  password: getEnvVar("DB_PASS"),
  database: getEnvVar("DB_NAME"),

  synchronize: false,

  logging: false,

  entities: [User],

  migrations: ["src/database/migrations/*.ts"],

  subscribers: [],
});
