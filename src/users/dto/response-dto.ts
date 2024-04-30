import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserGetProfileResponse {
  @ApiProperty({ example: 'userId' })
  userId: string;
}
export class UserJoinResponseDTO {
  @IsEmail()
  @ApiProperty({ example: 'user1@example.com' })
  email: string;
}
export class UserLoginResponseDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'id' })
  userId: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true })
  isLoggedIn: boolean;
}
export class RefreshTokenResponseDTO {}

export class AccessTokenResponseDTO {}
