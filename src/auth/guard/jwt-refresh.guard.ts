import {
  BadRequestException,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Err } from '../../shared/error';
import * as CryptoJS from 'crypto-js';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('can Actovate', request.headers);
    const { authorization } = request.headers;
    if (authorization === undefined) {
      throw new BadRequestException(Err.TOKEN.NOT_SEND_REFRESH_TOKEN);
    }

    const refreshToken = authorization.replace('Bearer ', '');
    console.log(refreshToken);
    const refreshTokenValidate = await this.validate(refreshToken);

    console.log(refreshTokenValidate);
    console.log(refreshTokenValidate);
    request.user = refreshTokenValidate;
    return true;
  }

  async validate(refreshToken: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(refreshToken, process.env.AES_KEY);
      console.log('bytes', bytes);

      const token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log('token', token);

      const tokenVerify = await this.authService.tokenValidate(token);
      console.log(tokenVerify);
      const user = await this.usersService.findUserById(tokenVerify.sub);
      console.log(user);
      if (user.refreshToken === refreshToken) {
        return user;
      } else {
        throw new Error('no permission');
      }
    } catch (error) {
      switch (error.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'invalid token':
          throw new BadRequestException(Err.TOKEN.INVALID_TOKEN);

        case 'no permission':
          throw new BadRequestException(Err.TOKEN.NO_PERMISSION);

        case 'jwt expired':
          throw new BadRequestException(Err.TOKEN.JWT_EXPIRED);

        default:
          throw new HttpException('서버 오류입니다.', 500);
      }
    }
  }
}
