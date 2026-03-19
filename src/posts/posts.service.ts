import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { prisma } from 'src/prisma';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService implements OnModuleInit {

  async onModuleInit() {
    await prisma.$connect();
  }

  async create(createPostDto: CreatePostDto) : Promise<Post> {
    return await prisma.post.create({
      data : createPostDto
    });
  }

  async findAll() : Promise<Post[]> {
    return await prisma.post.findMany();
  }

  async findOne(postId: string) : Promise<Post | null> {
    return await prisma.post.findFirst({
      where : {id : postId}
    });
  }

  async update(postId : string, updatePostDto: UpdatePostDto) : Promise<Post> {
    return await prisma.post.update({
      where : {id : postId},
      data : updatePostDto
    });
  }

  async remove(postId : string) : Promise<Post> {
    return prisma.post.delete({
      where : {id : postId}
    });
  }
}
