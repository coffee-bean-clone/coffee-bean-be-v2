import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserLoginRequestDTO {
  @IsEmail()
  @ApiProperty({ example: 'user1@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Password!23' })
  password: string;
}
export class UserJoinRequestDTO extends UserLoginRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'User' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '경기도 수원시 팔달구 우만동 110-1' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '101호' })
  detailAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '16274' })
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '010-1234-1234' })
  phoneNumber: string;
}

export class UserGetProfileRequestDTO {
  @IsEmail()
  @ApiProperty({ example: 'user1@example.com' })
  email: string;
}
export class PhoneNumberCheckDTO {
  @IsPhoneNumber()
  @ApiProperty({ example: '010-1234-1234' })
  phoneNumber: string;
}
export class EmailCheckDTO {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;
}
export class GetAccessTokenDTO {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;
}
export class GetRefreshTokenDTO {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;
}
