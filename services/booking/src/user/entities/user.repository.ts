// src/user/user.repository.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export class UserRepository {

  public constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) { }

  // Create a new user
  async createUser(request: UserEntity): Promise<UserEntity> {
    const result = await this.repository.insert(request);
    request.id = result.identifiers[0].id;
    return request;
  }

  // Find a user by ID
  async findUserById(id: number): Promise<UserEntity | undefined> {
    return this.repository.findOneBy({ id });
  }

  // Update a user's details
  async updateUser(id: number, userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    await this.repository.update(id, userData);
    return user;
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    await this.repository.remove(user);
  }

  // Find all users (with optional filters)
  async findAllUsers(filter?: Partial<UserEntity>): Promise<UserEntity[]> {
    const users = await this.repository.find({ where: filter });
    return users;
  }

  // Find a user by email
  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.repository.findOneBy({ email });
  }
}
