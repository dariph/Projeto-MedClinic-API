import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1710000000000 implements MigrationInterface {
  name = "CreateUsersTable1710000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "nome",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "senha",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "role",
            type: "enum",
            enum: ["Administrador", "Atendente"],
            enumName: "users_role_enum",
            default: "'Atendente'",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
