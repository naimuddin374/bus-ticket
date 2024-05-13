// src/route/route.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RouteRequest, RouteUpdateRequest } from './dto/request.dto';
import { RouteListResponse, RouteResponse } from './dto/response.dto';
import { RouteService } from './route.service';

@ApiTags('routes')
@Controller('routes')
export class RouteController {
  constructor(private readonly service: RouteService) { }

  @Post()
  @ApiBody({ type: RouteRequest })
  @ApiOperation({ summary: 'Create a new route' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: RouteResponse })
  async createRoute(@Body() payload: RouteRequest): Promise<RouteResponse> {
    return this.service.createRoute(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a record by ID' })
  @ApiResponse({ status: 200, description: 'Record found.', type: RouteResponse })
  @ApiNotFoundResponse({ description: 'Record not found' })
  async getRouteById(@Param('id') id: number): Promise<RouteResponse> {
    return this.service.getRouteById(id);
  }

  @Put(':id')
  @ApiBody({ type: RouteUpdateRequest })
  @ApiOperation({ summary: 'Update a record by ID' })
  @ApiResponse({ status: 200, description: 'Record updated successfully.', type: RouteResponse })
  @ApiNotFoundResponse({ description: 'Record not found' })
  async updateRoute(@Param('id') id: number, @Body() payload: RouteUpdateRequest): Promise<RouteResponse> {
    return this.service.updateRoute(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a record by ID' })
  @ApiResponse({ status: 204, description: 'Record deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  async deleteRoute(@Param('id') id: number): Promise<void> {
    return this.service.deleteRoute(id);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Find records by time range' })
  @ApiResponse({ status: 200, description: 'Records found', type: RouteListResponse })
  @ApiBadRequestResponse({ description: 'Invalid date range or searching for past dates' })
  async findRoutesByTimeRange(
    @Query('start') reqStartDate: number,
    @Query('end') reqEndDate: number
  ): Promise<RouteListResponse> {
    return this.service.findRoutesByTimeRange(reqStartDate, reqEndDate);
  }
}
