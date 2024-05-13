import { UserStatus, UserTypes } from "src/types/systemTypes";
import { UserEntity } from "../entities/user.entity";

export class UserResponse {
  public id: number;
  public email: string;
  public name: string;
  public phone: string;
  public type: UserTypes;
  public status: UserStatus;
  public createdAt: Date;
  public updatedAt: Date;

  public static fromEntity(entity: UserEntity): UserResponse {
    const response = new UserResponse();
    response.id = entity.id;
    response.email = entity.email;
    response.name = entity.name;
    response.phone = entity.phone;
    response.type = entity.type;
    response.status = entity.status;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;

    return response;
  }
}

export class UserListResponse {
  public users: UserResponse[];

  public static fromEntityList(entities: UserEntity[]): UserListResponse {
    const response = new UserListResponse();
    response.users = entities.map(entity => UserResponse.fromEntity(entity));

    return response;
  }
}