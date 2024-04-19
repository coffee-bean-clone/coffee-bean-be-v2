import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserJoinResponseDTO {
  @IsEmail()
  @ApiProperty({ example: 'user1@example.com' })
  email: string;
}
