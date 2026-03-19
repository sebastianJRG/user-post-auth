import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'src/response/response.interface';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService : UsersService
  ) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) : Promise<Response> {
    const author = await this.usersService.findOne(createPostDto.authorId);
    if (!author) throw new NotFoundException(`User not found with id : ${createPostDto.authorId}`);
    const newPost = await this.postsService.create(createPostDto);
    return {
      data : newPost,
      error : null,
      success : true
    };
  }

  @Get()
  async findAll() : Promise<Response> {
    const allPosts = await this.postsService.findAll();
    return {
      data : allPosts,
      error : null,
      success : true
    };
  }

  @Get(':id')
  async findOne(@Param('id') postId: string) : Promise<Response> {
    const post = await this.postsService.findOne(postId);
    if (!post) throw new NotFoundException(`post not found with id: ${postId}`);
    return {
      data : post,
      error : null,
      success : true
    };
  }

  @Put(':id')
  async update(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto) : Promise<Response> {
    const updatePost = await this.postsService.update(postId, updatePostDto);
    return {
      data : updatePost,
      error : null,
      success : true
    };
  }

  @Delete(':id')
  async remove(@Param('id') postId: string) : Promise<Response> {
    const deletePost = await this.postsService.remove(postId);
    return {
      data : deletePost,
      error : null,
      success : true
    };
  }
}
