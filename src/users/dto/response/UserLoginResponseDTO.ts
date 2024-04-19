import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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
