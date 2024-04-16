import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.usersService.authenticateUser(email, password);
    if (user) return user;
    return null;
  }

  //JWT 생성
  async createAccessToken(user: any) {
    const payload = {
      type: 'accessToken',
      username: user.email,
      sub: user.userId,
    };
    //JWT 표준과 일관성 유지를 위해 sub라는 속성 이름으로 userId를 보관
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
  async createRefreshToken(user: any) {
    const payload = {
      type: 'refreshToken',
      username: user.username,
      sub: user.userId,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '20700m',
    });

    return token;
  }
}
