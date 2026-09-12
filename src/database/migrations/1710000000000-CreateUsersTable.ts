import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1710000000000 implements MigrationInterface {
  name = "CreateUsersTable1710000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
  `);

    await queryRunner.query(`
    CREATE TYPE "public"."users_role_enum"
    AS ENUM ('Administrador', 'Atendente')
  `);

    await queryRunner.query(`
    CREATE TABLE "users" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "nome" character varying(100) NOT NULL,
      "email" character varying(100) NOT NULL,
      "senha" character varying NOT NULL,
      "role" "public"."users_role_enum"
        NOT NULL DEFAULT 'Atendente',
      "created_at" TIMESTAMP NOT NULL DEFAULT now(),

      CONSTRAINT "PK_users_id"
        PRIMARY KEY ("id"),

      CONSTRAINT "UQ_users_email"
        UNIQUE ("email")
    )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "users"
    `);

    await queryRunner.query(`
      DROP TYPE "public"."users_role_enum"
    `);
  }
}
