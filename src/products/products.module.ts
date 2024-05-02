import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/category.module';
import { ProductSchema } from './schemas/procuct.schema';
import { ProductQuestionSchema } from './schemas/product-question.schema';
import { ProductQuestionService } from 'src/product-question/product-question.service';
import { ProductCartService } from 'src/product-cart/product-cart.service';
import { ProductCartSchema } from './schemas/product-cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'ProductQuestion', schema: ProductQuestionSchema },
      { name: 'ProductCart', schema: ProductCartSchema },
    ]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductQuestionService, ProductCartService],
  exports: [ProductModule],
})
export class ProductModule {}
