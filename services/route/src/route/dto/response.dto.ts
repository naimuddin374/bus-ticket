import { RouteEntity } from "../entities/route.entity";

export class RouteResponse {
  public id: number;
  public origin: string;
  public destination: string;
  public departureTime: number;
  public arrivalTime: number;
  public capacity: number;
  public createdAt: Date;
  public updatedAt: Date;

  public static fromEntity(entity: RouteEntity): RouteResponse {
    const response = new RouteResponse();
    response.id = entity.id;
    response.origin = entity.origin;
    response.destination = entity.destination;
    response.departureTime = entity.departureTime;
    response.arrivalTime = entity.arrivalTime;
    response.capacity = entity.capacity;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;

    return response;
  }
}

export class RouteListResponse {
  public payload: RouteResponse[];

  public static fromEntityList(entities: RouteEntity[]): RouteListResponse {
    const response = new RouteListResponse();
    response.payload = entities.map(entity => RouteResponse.fromEntity(entity));

    return response;
  }
}