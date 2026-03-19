import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
/*
FALTA HACER QUE EL UPDATEPOSTDTO NO ACEPTE AUTHORID COMO CAMPO MODIFICABLE
*/
export class UpdatePostDto extends PartialType(CreatePostDto) {}
