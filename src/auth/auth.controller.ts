import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { REQ, RES } from 'src/users/dto';

@ApiTags('Auth')
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
  @ApiBody({ type: REQ.UserLoginRequestDTO })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: RES.UserLoginResponseDTO,
  })
  @ApiResponse({ status: 405, description: '존재하지 않는 이메일 입니다.' })
  @ApiResponse({ status: 400, description: '비밀번호가 일치하지 않습니다.' })
  @Post('/login')
  async login(@Body() userLoginRequestDTO: REQ.UserLoginRequestDTO) {
    const user = await this.userService.authenticateUser(userLoginRequestDTO);
    if (!user) throw new Error('토큰 생성 실패');
    const token = await this.authService.createAccessToken(user);
    const request = { isLoggedIn: true, token: token, userId: user._id };
    return request;
  }
}
