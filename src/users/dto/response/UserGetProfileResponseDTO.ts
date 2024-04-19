import { ApiProperty } from '@nestjs/swagger';

export class UserGetProfileResponse {
  @ApiProperty({ example: 'userId' })
  userId: string;
}
