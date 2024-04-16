import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserLoginRequestDTO } from 'src/users/dto/UserLoginRequestDTO';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: '로그인',
    description: '로그인에 성공하면 JWT를 반환합니다.',
  })
  @ApiBody({ type: UserLoginRequestDTO })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 400, description: '존재하지 않는 이메일 입니다.' })
  @ApiResponse({ status: 401, description: '비밀번호가 일치하지 않습니다.' })
  @Post('/login')
  async login(@Body() userLoginRequestDTO: UserLoginRequestDTO) {
    const user = await this.userService.authenticateUser(userLoginRequestDTO);
    if (!user) throw new Error('토큰 생성 실패');

    return await this.authService.createAccessToken(user);
  }
}
