import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserLoginRequestDTO } from 'src/users/dto/request/UserLoginRequestDTO';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLoginRequestDTO: UserLoginRequestDTO): Promise<any> {
    const user = await this.usersService.authenticateUser(userLoginRequestDTO);
    if (user) return user;
    return null;
  }

  //JWT 생성
  async createAccessToken(user: any) {
    const payload = {
      type: 'accessToken',
      email: user.email,
      sub: user._id,
    };
    //JWT 표준과 일관성 유지를 위해 sub라는 속성 이름으로 userId를 보관
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '600s',
    });
    return accessToken;
  }

  async createRefreshToken(user: any) {
    const payload = {
      type: 'refreshToken',
      email: user.email,
      sub: user._id,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '20700m',
    });
    return token;
  }
}
