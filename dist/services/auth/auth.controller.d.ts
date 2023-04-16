import { AuthService } from './service/auth.service';
import { User } from './entities/user.entity';
export declare class AuthController {
    private usersService;
    constructor(usersService: AuthService);
    signup(user: User): Promise<User>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
