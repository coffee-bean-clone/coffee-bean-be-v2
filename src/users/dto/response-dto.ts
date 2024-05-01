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
export class RefreshTokenDTO {
  @IsString()
  @ApiProperty({
    example:
      'U2FsdGVkX18rxIqzsDHlQfNo18cg11OpXFPiKvtbGQiBl4O2s3v3Xln/SqwwPTA3TJU+yRspnxKpyJHK07LvtAzuQUPdzVk/ijyXREnY9a8xUubMafXfWsRcUcFKGYn3ZsR8K4ZpMCnZn2vpXEcL8vejctVEQd/2T+v3jL+0gveW0r9nFAe1vrmDVeh9dHp38ttuJVuE0OgkrhW+1spzIFiltiJJ8UFrSXB4C6PQcZqa5SjTTe8BuQBk5NuX6eyR7xS7/kQX8df8PWwN3erQOIblUUUx5Fi4xQX1jwyWrXGv3sUleQL32QvEc+JrVKIpvRUZ83E6ehkfaw+x3VjfwVCRBmxEJWKmK3Pp8Vmk+HrNSWH9FvTaLvDrQTp2lXmE',
  })
  refreshToken: string;

  @IsString()
  @ApiProperty({
    example: '2024-05-14T20:57:58.000Z',
  })
  tokenExp: string;
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

  @IsString()
  @ApiProperty({
    example:
      'eyU2FsdGVkX18rxIqzsDHlQfNo18cg11OpXFPiKvtbGQiBl4O2s3v3Xln/SqwwPTA3TJU+yRspnxKpyJHK07LvtAzuQUPdzVk/ijyXREnY9a8xUubMafXfWsRcUcFKGYn3ZsR8K4ZpMCnZn2vpXEcL8vejctVEQd/2T+v3jL+0gveW0r9nFAe1vrmDVeh9dHp38ttuJVuE0OgkrhW+1spzIFiltiJJ8UFrSXB4C6PQcZqa5SjTTe8BuQBk5NuX6eyR7xS7/kQX8df8PWwN3erQOIblUUUx5Fi4xQX1jwyWrXGv3sUleQL32QvEc+JrVKIpvRUZ83E6ehkfaw+x3VjfwVCRBmxEJWKmK3Pp8Vmk+HrNSWH9FvTaLvDrQTp2lXmE',
  })
  accessToken: string;

  @ApiProperty()
  refreshToken: RefreshTokenDTO;
}
export class RefreshTokenResponseDTO {}

export class AccessTokenResponseDTO {}
