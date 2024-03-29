import { Injectable } from '@nestjs/common';
import { Product } from './schemas/procuct.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import products from './data/product.data';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  getAllProducts() {
    return 'getAllProducts';
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async findSale(): Promise<Product[]> {
    return this.productModel.find({ isSale: true });
  }
  async findNew(): Promise<Product[]> {
    return this.productModel.find({ isNew: true });
  }
  async addProduct() {
    console.log(products.length);
    for (const productData of products) {
      const newProduct = new this.productModel(productData);
      await newProduct.save();
      console.log(`${newProduct.title}이 추가되었습니다.`);
    }

    return '상품 및 상품 이미지가 성공적으로 추가되었습니다.';
  }
  async deleteAll() {
    return this.productModel.deleteMany({}).exec();
  }
}
