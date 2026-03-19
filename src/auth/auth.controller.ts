import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin } from './dto/user-login.dto';
import { Response } from 'src/response/response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() userLogin : UserLogin) : Promise<Response> {
    const result = await this.authService.singIn(userLogin.username, userLogin.password);
    return {
      data : {access_token : result.access_token},
      error : null,
      success : true
    };
  }

}
