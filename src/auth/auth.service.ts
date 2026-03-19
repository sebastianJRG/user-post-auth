import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService : UsersService,
        private readonly jwtService : JwtService
    ) {}

    async singIn(username : string, password : string) {
        const user = await this.usersService.findByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('invalid credentials');
        }

        const payload = {
            sub : user.id,
            username : user.username
        };
        return {
            access_token : this.jwtService.sign(payload)
        };
    }
}
