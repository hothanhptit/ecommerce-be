import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class AuthService {
    private userRepository;
    private jwt;
    constructor(userRepository: Repository<User>, jwt: JwtService);
    signup(user: User): Promise<User>;
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
