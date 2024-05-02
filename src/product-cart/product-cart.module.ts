import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCartSchema } from 'src/products/schemas/product-cart.schema';
import { ProductCartService } from './product-cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductCart', schema: ProductCartSchema },
    ]),
  ],
  providers: [ProductCartService],
})
export class ProductCartModule {}
