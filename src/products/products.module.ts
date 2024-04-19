import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModule } from 'src/category/category.module';

import { ProductSchema } from './schemas/procuct.schema';
import { ProductQuestionSchema } from './schemas/productQuestion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'ProductQuestion', schema: ProductQuestionSchema },
    ]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductModule],
})
export class ProductModule {}
