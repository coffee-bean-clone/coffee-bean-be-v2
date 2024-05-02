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
  createdAt: string | null;

  @IsString()
  @ApiProperty({ example: '2024-05-14T20:57:58.000Z' })
  updatedAt: string | null;
}

class ProductCartResultDTO {
  @ApiProperty({ example: '663365d0edb8d6de5af9f659' })
  _id: string;
  @ApiProperty({ example: '662744d18d85bb735ab5dc32' })
  userId: string;

  @ApiProperty({ example: '65fc29dc3f95892a6c88d371' })
  productId: string;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: '2024-05-02T10:07:12.672Z' })
  createAt: Date;
}

export class ProductCartAddDTO {
  @ApiProperty({ example: true })
  isSuccess: boolean;

  @ApiProperty()
  result: ProductCartResultDTO;
}
