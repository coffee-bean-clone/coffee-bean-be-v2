import { Injectable } from '@nestjs/common';
import { Product } from './schemas/procuct.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import products from './data/product.data';
import { CategoryService } from 'src/category/category.service';
interface Category {
  endPoint: string;
  categoryName: string;
}
@Injectable()
export class MainCategoryService {
  private readonly mainCategoris: Category[] = [
    {
      endPoint: 'stick_coffee',
      categoryName: '스틱 커피',
    },
    {
      endPoint: 'powder_coffee',
      categoryName: '분쇄형 커피',
    },
    {
      endPoint: '파우치&컵 커피',
      categoryName: 'pouch_and_cup_coffee',
    },
    {
      endPoint: '캡슐 커피',
      categoryName: 'capsule_coffee',
    },
    {
      endPoint: '티',
      categoryName: 'tea',
    },
    {
      endPoint: '상품',
      categoryName: 'goods',
    },
  ];
  findMainCategoryName(endPoint: string): string {
    const match = this.mainCategoris.find(
      (mainCategory) => mainCategory.endPoint === endPoint,
    );
    return match.categoryName;
  }
}
@Injectable()
export class SubCategoryService {
  private readonly subCategorys: Category[] = [
    {
      endPoint: 'stick_coffee',
      categoryName: '스틱 커피',
    },
    {
      endPoint: 'powder_coffee',
      categoryName: '분쇄형 커피',
    },
    {
      endPoint: 'drip_bag',
      categoryName: '드립백',
    },
    {
      endPoint: 'pouch_coffee',
      categoryName: '파우치 커피',
    },
    {
      endPoint: 'cup_coffee',
      categoryName: '컵 커피',
    },
    {
      endPoint: 'nespresso',
      categoryName: '네스프레소 호환용',
    },
    {
      endPoint: 'cbtl',
      categoryName: 'CBTL 호환용',
    },
    {
      endPoint: 'classic_tea',
      categoryName: '클래식 티',
    },
    {
      endPoint: 'herbal_tea',
      categoryName: '허브 티',
    },
    {
      endPoint: 'fruit_tea',
      categoryName: '프룻 티',
    },
    {
      endPoint: 'ice_tumbler',
      categoryName: '아이스 텀블러',
    },
    {
      endPoint: 'warm_tumbler',
      categoryName: '보온 텀블러',
    },
    {
      endPoint: 'mug',
      categoryName: '머그',
    },
  ];
  findMainCategoryName(endPoint: string): string {
    const match = this.subCategorys.find(
      (subCategory) => subCategory.endPoint === endPoint,
    );
    return match.categoryName;
  }
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly categoryService: CategoryService,
  ) {}

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
