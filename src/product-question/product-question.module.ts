import { Module } from '@nestjs/common';
import { ProductQuestionService } from './product-question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductQuestionSchema } from 'src/products/schemas/product-question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductQuestion', schema: ProductQuestionSchema },
    ]),
  ],
  providers: [ProductQuestionService],
})
export class ProductQuestionModule {}
