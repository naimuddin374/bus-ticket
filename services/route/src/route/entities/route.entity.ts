// src/route/route.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("routes")
export class RouteEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public origin: string;

  @Column()
  public destination: string;

  @Column()
  public departureTime: number;

  @Column()
  public arrivalTime: number;

  @Column()
  public capacity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt: Date;
}
