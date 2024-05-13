// src/route/route.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { RouteRequest, RouteUpdateRequest, UpdateCapacityRequest } from './dto/request.dto';
import { RouteListResponse, RouteResponse } from './dto/response.dto';
import { RouteRepository } from './entities/route.repository';

@Injectable()
export class RouteService {

  public constructor(
    private readonly db: RouteRepository,
  ) { }

  async createRoute(payload: RouteRequest): Promise<RouteResponse> {
    try {
      const entity = RouteRequest.toEntity(payload);
      const record = await this.db.createRecord(entity);
      return RouteResponse.fromEntity(record);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async getRouteById(id: number): Promise<RouteResponse> {
    try {
      const record = await this.db.findRecordById(id);
      if (!record) {
        throw new NotFoundException(`Record with ID ${id} not found`);
      }
      return RouteResponse.fromEntity(record);
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }

  async updateRoute(id: number, payload: RouteUpdateRequest): Promise<RouteResponse> {
    try {
      const record = await this.db.updateRecord(id, payload);
      return RouteResponse.fromEntity(record);
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }

  async updateRouteCapacity(id: number, payload: UpdateCapacityRequest): Promise<RouteResponse> {
    try {
      const record = await this.db.updateRecord(id, payload);
      return RouteResponse.fromEntity(record);
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteRoute(id: number): Promise<void> {
    try {
      await this.deleteRoute(id);
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }

  async findRoutesByTimeRange(reqStartDate: number, reqEndDate: number): Promise<RouteListResponse> {
    // End date remains as selected, but at least it must be greater than the start date
    if (reqStartDate > reqEndDate) {
      throw new BadRequestException('End date must be after start date');
    }

    let startTime = moment(reqStartDate).unix();

    const timestamp = Date.now();
    const now = moment(timestamp).unix();

    if (moment(startTime).day() < moment(now).day()) {
      throw new BadRequestException('Cannot search for routes in the past');
    }

    if (moment(startTime).day() === moment(now).day()) {
      startTime = now;
    }

    try {
      const endTime = moment(reqEndDate).unix();
      const records = await this.db.findRoutesBetweenDates(startTime, endTime);
      return RouteListResponse.fromEntityList(records)
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
