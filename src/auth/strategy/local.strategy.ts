import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
    /**
     * options 객체를 전달함으로써 다른 속성 이름을 지정할 수가 있습니다(예: super({ usernameField: 'email' })).
     * 그 외에도 다양한 옵션을 사용 가능
     */
  }

  async validate(username: string, password: string): Promise<any> {
    //validate(username: string, password:string): any
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
