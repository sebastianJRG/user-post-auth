import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from 'src/prisma';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {

  async onModuleInit() {
    await prisma.$connect();
  }

  async create(createUserDto: CreateUserDto) : Promise<User> {

    if (process.env.BCRYPT) {
      const hashPass = await bcrypt.hash(createUserDto.password, Number(process.env.BCRYPT));
      createUserDto.password = hashPass;
    }

    return await prisma.user.create({
      data: createUserDto,
      include: {posts:true}
    });

  }

  async findAll() : Promise<User[]> {
    return await prisma.user.findMany({
      include : {posts: true}
    });
  }

  async findOne(userId: string) : Promise<User | null> {
    return await prisma.user.findFirst({
      where: {id : userId},
      include: {posts: true}
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) : Promise<User> {
    if (updateUserDto.password && process.env.BCRYPT) {
      const newHashPass = await bcrypt.hash(updateUserDto.password, Number(process.env.BCRYPT));
      updateUserDto.password = newHashPass;
    }

    return await prisma.user.update({
      where: {id: userId},
      data : updateUserDto,
      include: {posts: true}
    });
  }

  async remove(userId: string) : Promise<User> {
    return await prisma.user.delete({
      where: {id: userId},
      include: {posts: true}
    });
  }
}
