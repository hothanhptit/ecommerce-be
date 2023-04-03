import { ApiTags } from '@nestjs/swagger/dist';
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('api/v1/auth/')
export class AuthController {
    constructor(private usersService: AuthService) { }
    
    @Post('signup')
    async signup(@Body() user: User): Promise<User> {
        return this.usersService.signup(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.usersService.login(req.user)
    }
}