import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserLoginRequestDTO } from 'src/users/dto/request/UserLoginRequestDTO';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const userLoginRequestDTO: UserLoginRequestDTO = {
      email: email,
      password: password,
    };
    const user = await this.authService.validateUser(userLoginRequestDTO);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
