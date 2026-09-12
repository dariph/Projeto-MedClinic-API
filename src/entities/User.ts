import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum UserRole {
  ADMIN = "Administrador",
  ATENDENTE = "Atendente",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  nome!: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
  })
  senha!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.ATENDENTE,
  })
  role!: UserRole;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}
