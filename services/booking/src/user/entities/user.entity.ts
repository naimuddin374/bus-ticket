// src/user/user.entity.ts
import { UserStatus, UserTypes } from 'src/types/systemTypes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, name: "email" })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public phone: string;

  @Column({
    type: "enum",
    enum: UserTypes,
    default: UserTypes.CUSTOMER,
    enumName: 'userType'
  })
  public type: UserTypes;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.PENDING,
    enumName: 'UserStatus'
  })
  public status: UserStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt: Date;
}
