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
    const result = await this.productCartModel.findOneAndUpdate(
      {
        userId: productCartAddDTO.userId,
        productId: productCartAddDTO.productId,
      },
      { $inc: { quantity: 1 }, $setOnInsert: { createAt: new Date() } }, // $inc 연산자로 수량을 1 증가, $setOnInsert 연산자로 createAt 필드를 설정
      { new: true, upsert: true }, // upsert 옵션을 true로 설정하여 문서가 없는 경우 새로 생성
    );
    if (!result) {
      throw new Error('cart 생성 실패');
    }
    return result;
  }

  async removeProductCart(userId: string, productId: string) {
    const result = await this.productCartModel.findOneAndUpdate(
      {
        userId: userId,
        productId: productId,
        quantity: { $gt: 0 }, // 수량이 0보다 큰 경우에만 수량을 1 감소시킴
      },
      { $inc: { quantity: -1 } }, // $inc 연산자로 수량을 1 감소
      { new: true }, // 갱신된 문서를 반환
    );

    // if (!result) {
    //   throw new Error('장바구니에서 해당 상품을 찾을 수 없습니다.');
    // }

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
