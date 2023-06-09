import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async signup(user: User): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (foundUser) throw new ForbiddenException();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: { username: username },
    });
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }

      return null;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      name: user.name,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
