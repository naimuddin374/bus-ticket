// src/user/user.repository.ts
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { UpdateCapacityRequest } from '../dto/request.dto';
import { RouteEntity } from './route.entity';


export class RouteRepository {

  public constructor(
    @InjectRepository(RouteEntity)
    private readonly repository: Repository<RouteEntity>
  ) { }

  // Create a new record
  async createRecord(request: RouteEntity): Promise<RouteEntity> {
    const result = await this.repository.insert(request);
    request.id = result.identifiers[0].id;
    return request;
  }

  // Find a record by ID
  async findRecordById(id: number): Promise<RouteEntity | undefined> {
    return this.repository.findOneBy({ id });
  }

  // Update a record's details
  async updateRecord(id: number, updateBody: Partial<RouteEntity>): Promise<RouteEntity> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new Error('Record not found');
    }
    await this.repository.update(id, updateBody);
    return record;
  }

  // Update a record capacity
  async updateCapacity(id: number, updateBody: UpdateCapacityRequest): Promise<RouteEntity> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new Error('Record not found');
    }
    await this.repository.update(id, { capacity: updateBody.capacity });
    return record;
  }

  // Delete a record by ID
  async deleteRecord(id: number): Promise<void> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new Error('Record not found');
    }
    await this.repository.remove(record);
  }

  // Find routes scheduled from now until the end of the next day
  async findRoutesByDateTime(): Promise<RouteEntity[]> {
    const now = moment().toDate(); // Current moment
    const endOfToday = moment().endOf('day').toDate(); // End of today

    return await this.repository.find({
      where: {
        // departureTime: MoreThanOrEqual(now),
        // arrivalTime: LessThanOrEqual(endOfToday)
      },
      order: {
        departureTime: 'ASC' // Sorts the results by departure time in ascending order
      }
    });
  }

  // Find routes scheduled between a given start time and end time
  async findRoutesBetweenDates(startDate: number, endDate: number): Promise<RouteEntity[]> {
    return this.repository.find({
      where: {
        departureTime: MoreThanOrEqual(startDate),
        arrivalTime: LessThanOrEqual(endDate)
      },
      order: {
        departureTime: 'ASC'
      }
    });
  }

}
