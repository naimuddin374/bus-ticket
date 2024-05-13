import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRequest, UserUpdateRequest } from './dto/request.dto';
import { UserListResponse, UserResponse } from './dto/response.dto';
import { UserService } from './user.service';

@Injectable()
@Controller("main/users")
@ApiTags("User")
// @ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new record' })
  @ApiBody({ type: UserRequest })
  @ApiResponse({ status: 201, description: 'Record create successful', type: UserResponse })
  create(@Body() payload: UserRequest) {
    return this.userService.create(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Records found' })
  @ApiResponse({ status: 200, description: 'Records found', type: UserListResponse, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update record' })
  @ApiBody({ type: UserUpdateRequest })
  @ApiResponse({ status: 201, description: 'Record update successful', type: UserResponse })
  update(@Param('id') id: string, @Body() payload: UserUpdateRequest) {
    return this.userService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
