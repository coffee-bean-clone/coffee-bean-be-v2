import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductCart } from 'src/products/schemas/product-cart.schema';
import { REQ } from 'src/products/dto';

@Injectable()
export class ProductCartService {
  constructor(
    @InjectModel(ProductCart.name)
    private readonly productCartModel: Model<ProductCart>,
  ) {}

  async addProductCart(productCartAddDTO: REQ.ProcuctCartAddDTO) {
    const cart = new this.productCartModel({
      userId: productCartAddDTO.userId,
      productId: productCartAddDTO.productId,
      createAt: new Date(),
    });
    if (!cart) throw Error('cart 생성 실패');
    await cart.save();
  }
}
