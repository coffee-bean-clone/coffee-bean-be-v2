import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserJoinRequestDTO } from './dto/request/UserJoinRequestDTO';
import { UserLoginRequestDTO } from './dto/request/UserLoginRequestDTO';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserGetProfileRequestDTO } from './dto/request/UserGetProfileRequestDTO';
import { UserGetProfileResponse } from './dto/response/UserGetProfileResponseDTO';
import { UserJoinResponseDTO } from './dto/response/UserJoinResponseDTO';
import { UserLoginResponseDTO } from './dto/response/UserLoginResponseDTO';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/join')
  @ApiOperation({
    summary: '회원가입',
    description: '사용자 정보를 추가합니다.',
  })
  @ApiBody({ type: UserJoinRequestDTO })
  @ApiResponse({
    status: 200,
    description: '회원가입에 성공하였습니다',
    type: UserJoinResponseDTO,
  })
  @ApiResponse({ status: 404, description: '회원가입에 실패하였습니다' })
  createUser(@Body() userJoinRequestDTO: UserJoinRequestDTO) {
    return this.usersService.joinUser(userJoinRequestDTO);
  }

  @Post('/login')
  @ApiOperation({
    summary: '로그인 (테스트)',
    description: '사용자를 인증 후 로그인 여부를 반환합니다.',
  })
  @ApiBody({ type: UserLoginRequestDTO })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: UserLoginResponseDTO,
  })
  @ApiResponse({ status: 400, description: '존재하지 않는 이메일 입니다.' })
  @ApiResponse({ status: 401, description: '비밀번호가 일치하지 않습니다.' })
  login(@Body() userLoginRequestDTO: UserLoginRequestDTO) {
    return this.usersService.authenticateUser(userLoginRequestDTO);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '프로필',
    description: '인가에 성공하면 유저 정보를 반환합니다.',
  })
  @ApiBody({ type: UserGetProfileRequestDTO })
  @ApiBearerAuth('token')
  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserGetProfileResponse,
  })
  @ApiResponse({ status: 400, description: '없는 유저입니다.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Body() request: UserGetProfileRequestDTO) {
    const { email } = request;
    const user = await this.usersService.findUser(email);
    if (!user) return '없는 유저입니다.';
    return user;
  }
}
