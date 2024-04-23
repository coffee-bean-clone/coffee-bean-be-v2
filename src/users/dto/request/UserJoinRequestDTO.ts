import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserLoginRequestDTO } from './UserLoginRequestDTO';

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
