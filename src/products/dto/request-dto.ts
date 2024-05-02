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
}

export class ProductQuestionUpdateDTO {
  @IsString()
  @ApiProperty({ example: '상품 문의 제목' })
  title: string;

  @IsString()
  @ApiProperty({ example: '상품 문의 내용' })
  content: string;
}

export class ProductQuestionReadDTO {
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

  @IsString()
  @ApiProperty({ example: '2024-05-14T20:57:58.000Z' })
  createdAt: string;

  @IsString()
  @ApiProperty({ example: '2024-05-14T20:57:58.000Z' })
  updatedAt: string;
}

export class ProcuctCartAddDTO {
  @IsString()
  @ApiProperty({ example: '660bb5864146c96c02c47978' })
  userId: string;

  @IsString()
  @ApiProperty({ example: '65fc29dc3f95892a6c88d369' })
  productId: string;
}
