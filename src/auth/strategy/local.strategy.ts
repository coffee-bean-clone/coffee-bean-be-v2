import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { REQ } from 'src/users/dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const userLoginRequestDTO: REQ.UserLoginRequestDTO = {
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
