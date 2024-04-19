import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserGetProfileRequestDTO {
  @IsEmail()
  @ApiProperty({ example: 'user1@example.com' })
  email: string;
}
