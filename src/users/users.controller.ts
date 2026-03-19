import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'src/response/response.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Response> {
    const newUser = await this.usersService.create(createUserDto);
    return {
      data: newUser,
      error: null,
      success: true,
    };
  }

  @Get()
  async findAll(): Promise<Response> {
    const allUsers = await this.usersService.findAll();
    return {
      data: allUsers,
      error: null,
      success: true,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Response> {
    const user = await this.usersService.findOne(id);
    if (!user)
      return {
        data: null,
        error: {
          code: '404',
          message: `user not found with id : ${id}`,
        },
        success: false,
      };

    return {
      data: user,
      error: null,
      success: true,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    const updateUser = await this.usersService.update(id, updateUserDto);
    return {
      data: updateUser,
      error: null,
      success: true,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Response> {
    const deleteUser = await this.usersService.remove(id);
    return {
      data: deleteUser,
      error: null,
      success: true,
    };
  }
}
