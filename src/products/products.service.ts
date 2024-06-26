import { Injectable } from '@nestjs/common';
import { Product } from './schemas/procuct.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import products from './data/product.data';
import { CategoryService } from 'src/category/category.service';
import { ProductQuestion } from './schemas/product-question.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(ProductQuestion.name)
    private readonly ProductQuestionModel: Model<ProductQuestion>,

    private readonly categoryService: CategoryService,
  ) {}

  async findCursor(limit: number = 10, cursor: string = null) {
    const query = cursor ? { _id: { $gt: cursor } } : {};
    return this.productModel.find(query).limit(limit).sort({ _id: 1 }).exec();
  }

  getAllProducts() {
    return 'getAllProducts';
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async findMain(mainCategory: string): Promise<Product[]> {
    const mainCategoryName =
      this.categoryService.findCategoryName(mainCategory);

    return this.productModel.find({ mainCategory: mainCategoryName });
  }
  async findSub(mainCategory: string, subCategory: string): Promise<Product[]> {
    const mainCategoryName =
      this.categoryService.findCategoryName(mainCategory);
    const subCategoryName = this.categoryService.findCategoryName(subCategory);
    return this.productModel.find({
      mainCategory: mainCategoryName,
      subCategory: subCategoryName,
    });
  }
  async findSale(): Promise<Product[]> {
    return this.productModel.find({ isSale: true });
  }
  async findNew(): Promise<Product[]> {
    return this.productModel.find({ isNew: true });
  }
  async addProduct() {
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
