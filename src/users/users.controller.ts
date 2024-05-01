import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';
import { REQ, RES } from './dto';
import {
  ApiSwaggerApiBody,
  ApiSwaggerApiResponse,
  ApiSwaggerBearerAuth,
  ApiSwaggerOperation,
  ApiSwaggerTags,
} from 'src/shared/decorators/swagger.decorator';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';

@ApiSwaggerTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/join')
  @ApiSwaggerOperation('회원가입', '사용자 정보를 추가합니다.')
  @ApiSwaggerApiBody(REQ.UserJoinRequestDTO)
  @ApiSwaggerApiResponse(
    HttpStatus.OK,
    '회원가입에 성공하였습니다',
    RES.UserJoinResponseDTO,
  )
  @ApiSwaggerApiResponse(HttpStatus.NOT_FOUND, '회원가입에 실패하였습니다')
  localJoin(@Body() userJoinRequestDTO: REQ.UserJoinRequestDTO) {
    return this.usersService.localJoin(userJoinRequestDTO);
  }

  @Post('/phone_number_check')
  @ApiSwaggerOperation('휴대폰 번호 중복확인')
  @ApiSwaggerApiBody(REQ.PhoneNumberCheckDTO)
  @ApiSwaggerApiResponse(HttpStatus.OK, '휴대폰 번호 중복 확인 완료')
  phoneNumberCheck(@Body() phoneNumberCheckDTO: REQ.PhoneNumberCheckDTO) {
    return this.usersService.phoneNumberCheck(phoneNumberCheckDTO.phoneNumber);
  }

  @Post('/email_check')
  @ApiSwaggerOperation('이메일 중복확인')
  @ApiSwaggerApiBody(REQ.EmailCheckDTO)
  @ApiSwaggerApiResponse(HttpStatus.OK, '이메일 중복 확인 완료')
  emailCheck(@Body() email: string) {
    return this.usersService.emailCheck(email);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  @ApiSwaggerApiResponse(HttpStatus.BAD_REQUEST, '존재하지 않는 이메일 입니다.')
  @ApiSwaggerApiResponse(HttpStatus.NOT_FOUND, '비밀번호가 일치하지 않습니다.')
  @ApiSwaggerOperation(
    '로그인',
    '사용자를 인증 후 accessToken과 refreshToken을 반환합니다.',
  )
  @ApiSwaggerApiBody(REQ.UserLoginRequestDTO)
  @ApiSwaggerApiResponse(HttpStatus.OK, '로그인 성공', RES.UserLoginResponseDTO)
  async login(@Body() userLoginRequestDTO: REQ.UserLoginRequestDTO) {
    const user = await this.usersService.findUser(userLoginRequestDTO.email);
    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);
    const isLoggedIn = true;
    const { email, name } = user;
    return { accessToken, refreshToken, email, name, isLoggedIn };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/auth/access-token')
  @ApiSwaggerOperation(
    'Access Token 가져오기',
    '유저의 이메일을 통해 Access Token을 가져옵니다.',
  )
  @ApiSwaggerApiBody(REQ.UserLoginRequestDTO)
  @ApiSwaggerApiResponse(
    HttpStatus.OK,
    'Access Token을 성공적으로 가져왔습니다.',
    RES.AccessTokenResponseDTO,
  )
  @ApiSwaggerApiResponse(HttpStatus.BAD_REQUEST, '존재하지 않는 이메일 입니다.')
  @ApiSwaggerApiResponse(HttpStatus.NOT_FOUND, '비밀번호가 일치하지 않습니다.')
  async getAccessToken(@Body() userLoginRequestDTO: REQ.UserLoginRequestDTO) {
    const user = await this.usersService.findUser(userLoginRequestDTO.email);
    const accessToken = await this.authService.createAccessToken(user);
    return { accessToken };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/auth/refresh-token')
  @ApiSwaggerOperation(
    'Refresh Token 재발급',
    '유저의 이메일을 통해 Refresh Token을 재발급합니다.',
  )
  @ApiSwaggerApiBody(REQ.UserLoginRequestDTO)
  @ApiSwaggerApiResponse(
    HttpStatus.OK,
    'Refresh Token을 성공적으로 재발급하였습니다.',
    RES.RefreshTokenResponseDTO,
  )
  @ApiSwaggerApiResponse(HttpStatus.BAD_REQUEST, '존재하지 않는 이메일 입니다.')
  @ApiSwaggerApiResponse(HttpStatus.NOT_FOUND, '비밀번호가 일치하지 않습니다.')
  async reissueRefreshToken(
    @Body() userLoginRequestDTO: REQ.UserLoginRequestDTO,
  ) {
    const user = await this.usersService.findUser(userLoginRequestDTO.email);
    console.log(user);
    return await this.authService.reissueRefreshToken(user);
  }

  @Get('/profile/:email')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation('프로필', '인가에 성공하면 유저 정보를 반환합니다.')
  @ApiSwaggerApiBody(REQ.UserGetProfileRequestDTO)
  @ApiSwaggerBearerAuth()
  @ApiSwaggerApiResponse(HttpStatus.OK, '성공', RES.UserGetProfileResponse)
  @ApiSwaggerApiResponse(HttpStatus.BAD_REQUEST, '없는 유저입니다.')
  @ApiSwaggerApiResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized')
  async getProfile(@Param('email') email: string) {
    console.log(email);
    const user = await this.usersService.findUser(email);
    if (!user) return '없는 유저입니다.';
    return user;
  }
}
