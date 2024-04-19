import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductQuestionCreateDTO {
  @IsString()
  @ApiProperty({ example: '660bb5864146c96c02c47978' })
  userId: string;

  @IsString()
  @ApiProperty({ example: '65fc29dc3f95892a6c88d369' })
  productId: string;

  @IsString()
  @ApiProperty({ example: '상품 문의 제목' })
  title: string;

  @IsString()
  @ApiProperty({ example: '상품 문의 내용' })
  content: string;

  // @isDate()
  // @ApiProperty({ example: '2024-04-19T12:00:00Z' }) // 예시에 맞는 날짜 및 시간 형식
  // createdAt: Date;
}
