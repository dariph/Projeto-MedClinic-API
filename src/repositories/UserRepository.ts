import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";

export class UserRepository {
  private get repository() {
    return AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({
      email,
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({
      id,
    });
  }

  async create(data: Partial<User>): Promise<User> {
    return this.repository.create(data);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
