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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserJoinRequestDTO } from './dto/UserJoinRequestDTO';
import { UserLoginRequestDTO } from './dto/UserLoginRequestDTO';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
  @ApiResponse({ status: 201, description: '회원가입에 성공하였습니다' })
  @ApiResponse({ status: 404, description: '회원가입에 실패하였습니다' })
  createUser(@Body() userInfo) {
    return this.usersService.registerUser(userInfo);
  }

  @Post('/login')
  @ApiOperation({
    summary: '로그인',
    description: '사용자를 인증 후 로그인 여부를 반환합니다.',
  })
  @ApiBody({ type: UserLoginRequestDTO })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 400, description: '존재하지 않는 이메일 입니다.' })
  @ApiResponse({ status: 401, description: '비밀번호가 일치하지 않습니다.' })
  login(@Body() userInfo) {
    return this.usersService.authenticateUser(
      userInfo.email,
      userInfo.password,
    );
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Body() userInfo) {
    return userInfo;
  }
}
