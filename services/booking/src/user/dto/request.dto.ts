import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserStatus, UserTypes } from 'src/types/systemTypes';
import { UserEntity } from '../entities/user.entity';


export class UserRequest {
  @ApiProperty({ example: 'naim@gmail.com' })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'pass1234' })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  readonly password: string;

  @ApiProperty({ example: 'Naim Uddin' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({ example: '01555555555' })
  @IsString()
  @MinLength(1)
  @MaxLength(11)
  @IsOptional()
  readonly phone: string;

  readonly type: UserTypes;
  readonly status: UserStatus;

  public static toEntity(request: UserRequest): UserEntity {
    const user = new UserEntity();
    user.email = request.email;
    user.password = request.password;
    user.name = request.name;
    user.phone = request.phone;
    user.type = request.type ? request.type : UserTypes.CUSTOMER;
    user.status = request.status ? request.status : UserStatus.PENDING;
    return user;
  }
}



export class UserUpdateRequest {
  @ApiProperty({ example: 'Naim Uddin' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '01555555555' })
  @IsString()
  @IsOptional()
  readonly phone: string;

  public static toEntity(request: UserUpdateRequest): UserEntity {
    const user = new UserEntity();
    if (request.name) user.name = request.name;
    if (request.phone) user.phone = request.phone;
    return user;
  }
}
