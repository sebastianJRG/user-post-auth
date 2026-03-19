import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  authorId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
