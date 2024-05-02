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
    const prevCart = await this.productCartModel.findOne({
      userId: productCartAddDTO.userId,
      productId: productCartAddDTO.productId,
    });
    if (!prevCart) {
      const newCart = new this.productCartModel({
        userId: productCartAddDTO.userId,
        productId: productCartAddDTO.productId,
        createAt: new Date(),
        quantity: 1,
      });
      if (!newCart) throw Error('cart 생성 실패');
      const result = await newCart.save();
      return result;
    }
    prevCart.quantity += 1;
    const result = await prevCart.save();
    return result;
  }
  async removeProductCart(_id: string) {
    const result = await this.productCartModel.findByIdAndDelete(_id);
    return result;
  }
  async findProductCartsByUser(userId: string) {
    const carts = await this.productCartModel.find({ userId: userId });

    return carts;
  }
  async findProductCartsByProduct(productId: string) {
    const carts = await this.productCartModel.find({ productId: productId });

    return carts;
  }
}
