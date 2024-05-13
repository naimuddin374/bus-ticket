import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import * as moment from 'moment-timezone';
import { RouteEntity } from '../entities/route.entity';

export class RouteRequest {
  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly origin: string;

  @ApiProperty({ example: 'Chittagong' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly destination: string;

  @ApiProperty({ example: moment().add(1, 'days').unix() })
  @IsNumber()
  @MinLength(3)
  @MaxLength(50)
  readonly departureTime: number;

  @ApiProperty({ example: moment().add(1, 'days').add(5, 'hours').unix() })
  @IsNumber()
  @MinLength(3)
  @MaxLength(50)
  readonly arrivalTime: number;


  public static toEntity(request: RouteRequest): RouteEntity {
    const entity = new RouteEntity();
    entity.origin = request.origin;
    entity.destination = request.destination;
    entity.departureTime = request.departureTime;
    entity.arrivalTime = request.arrivalTime;
    entity.capacity = 40;
    return entity;
  }
}



export class RouteUpdateRequest extends RouteRequest {
  @ApiProperty({ example: 40 })
  @IsNumber()
  readonly capacity: number;

  public static toEntity(request: RouteUpdateRequest): RouteEntity {
    const entity = new RouteEntity();
    entity.origin = request.origin;
    entity.destination = request.destination;
    entity.departureTime = request.departureTime;
    entity.arrivalTime = request.arrivalTime;
    entity.capacity = request.capacity;
    return entity;
  }
}

export class UpdateCapacityRequest {
  @ApiProperty({ example: 40 })
  @IsNumber()
  readonly capacity: number;
}
