import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginRequestDTO {
  @IsEmail()
  @ApiProperty({ example: 'user1@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Password!23' })
  password: string;
}
