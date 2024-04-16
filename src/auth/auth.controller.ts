import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserLoginRequestDTO } from 'src/users/dto/UserLoginRequestDTO';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() requestUserInfo: UserLoginRequestDTO) {
    //유저 검증
    const user = await this.userService.authenticateUser(
      requestUserInfo.email,
      requestUserInfo.password,
    );
    if (!user) throw new Error('토큰 생성 실패');
    return await this.authService.createAccessToken(requestUserInfo);
  }
}
