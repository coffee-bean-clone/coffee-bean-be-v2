import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

export class UserGetProfileResponse {
  @ApiProperty({ example: '662744d18d85bb735ab5dc32' })
  _id: string;

  @ApiProperty({ example: 'qwzx16@naver.com' })
  email: string;

  @ApiProperty({ example: '강경규' })
  name: string;

  @ApiProperty({ example: '경기 수원시 장안구 수성로276번길 53' })
  address: string;

  @ApiProperty({ example: '서문 어린이집 앞' })
  detailAddress: string;

  @ApiProperty({ example: '16274' })
  zipCode: string;

  @ApiProperty({ example: '010-8019-7134' })
  phoneNumber: string;

  @ApiProperty({
    example:
      'U2FsdGVkX1/gIljV8mM3hgW1k5Ju+wldFdUwjhr+yjLU0gP04uBEWzttQptFdmPHBZxbzMa2AiCREAXPhSBYb/CxI4kL/lsE293m5xMpAYZ6vDWIYEEzlxKPshLTsCEQU/+xGrU1ljf9ElPnzDwxxqTb5G9gWN/sLqO/TADps4dNR4McZmy6lCEIiEZ8UpE4A8Vl2NelgVyAEQB9SGzpziKzJSYmUmImiiEVyCjdRdA0v9G3JbdsqNpuKfmK1AU+Umxk4BZHnlm2XS7xpKaeJ2wqLDCtSYBkI1rT8IEfAJopub0HPXBPd42e+/CKIZ0HmifIxDOiAC1Xtoaip+sXv3eFneQYl2Zmu2JdBIO5tvQNPkCMyA8NrxcdipLDmJcS',
  })
  refreshToken: string;
}
export class RefreshTokenResponseDTO {
  @ApiProperty({
    example:
      'U2FsdGVkX1/gIljV8mM3hgW1k5Ju+wldFdUwjhr+yjLU0gP04uBEWzttQptFdmPHBZxbzMa2AiCREAXPhSBYb/CxI4kL/lsE293m5xMpAYZ6vDWIYEEzlxKPshLTsCEQU/+xGrU1ljf9ElPnzDwxxqTb5G9gWN/sLqO/TADps4dNR4McZmy6lCEIiEZ8UpE4A8Vl2NelgVyAEQB9SGzpziKzJSYmUmImiiEVyCjdRdA0v9G3JbdsqNpuKfmK1AU+Umxk4BZHnlm2XS7xpKaeJ2wqLDCtSYBkI1rT8IEfAJopub0HPXBPd42e+/CKIZ0HmifIxDOiAC1Xtoaip+sXv3eFneQYl2Zmu2JdBIO5tvQNPkCMyA8NrxcdipLDmJcS',
  })
  refreshToken: string;
}

export class AccessTokenResponseDTO {
  @IsString()
  @ApiProperty({
    example:
      'eyU2FsdGVkX18rxIqzsDHlQfNo18cg11OpXFPiKvtbGQiBl4O2s3v3Xln/SqwwPTA3TJU+yRspnxKpyJHK07LvtAzuQUPdzVk/ijyXREnY9a8xUubMafXfWsRcUcFKGYn3ZsR8K4ZpMCnZn2vpXEcL8vejctVEQd/2T+v3jL+0gveW0r9nFAe1vrmDVeh9dHp38ttuJVuE0OgkrhW+1spzIFiltiJJ8UFrSXB4C6PQcZqa5SjTTe8BuQBk5NuX6eyR7xS7/kQX8df8PWwN3erQOIblUUUx5Fi4xQX1jwyWrXGv3sUleQL32QvEc+JrVKIpvRUZ83E6ehkfaw+x3VjfwVCRBmxEJWKmK3Pp8Vmk+HrNSWH9FvTaLvDrQTp2lXmE',
  })
  accessToken: string;
}
