import { BadRequestException, Injectable } from '@nestjs/common';
import { getHashPassword } from 'src/utils/helper';
import { UserRequest, UserUpdateRequest } from './dto/request.dto';
import { UserListResponse, UserResponse } from './dto/response.dto';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {

  public constructor(
    private readonly db: UserRepository,
  ) { }

  async create(payload: UserRequest): Promise<UserResponse> {
    const toEntity = UserRequest.toEntity(payload)
    try {
      const hashPass = await getHashPassword(toEntity.password)
      toEntity.password = hashPass

      return await this.db.createUser(toEntity)
    } catch (error: any) {
      throw new BadRequestException(error.message)
    }
  }


  async findAll(): Promise<UserListResponse> {
    try {
      const response = await this.db.findAllUsers()
      return UserListResponse.fromEntityList(response)
    } catch (error: any) {
      throw new BadRequestException(error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, payload: UserUpdateRequest) {
    const toEntity = UserUpdateRequest.toEntity(payload)
    try {
      return await this.db.updateUser(id, toEntity)
    } catch (error: any) {
      throw new BadRequestException(error.message)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
