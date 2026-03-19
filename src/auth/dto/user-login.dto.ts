import { IsString, MinLength } from "class-validator";

export class UserLogin {
    @IsString()
    username : string;

    @IsString()
    @MinLength(8)
    password : string;
}