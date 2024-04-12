import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('/all')
  getAllProducts() {
    return this.productService.findAll();
  }
  @Get('/new')
  getNewProducts() {
    return this.productService.findNew();
  }
  @Get('/sale')
  getSaleProducts() {
    return this.productService.findSale();
  }
  @Get('/category/:mainCategory')
  getMainCategoryProducts(@Param('mainCategory') mainCategory: string) {
    console.log(mainCategory);
    return this.productService.findMain(mainCategory);
  }
  @Get('/category/:mainCategory/:subCategory')
  getSubCategoryProducts(
    @Param('mainCategory') mainCategory: string,
    @Param('subCategory') subCategory: string,
  ) {
    console.log(mainCategory, subCategory);
    return this.productService.findSub(mainCategory, subCategory);
  }
  @Post('/add')
  createProducts() {
    return this.productService.addProduct();
  }
  @Delete('/delete')
  deleteAll() {
    return this.productService.deleteAll();
  }
}
