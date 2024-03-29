import { Controller, Get, Post, Delete } from '@nestjs/common';
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
  @Post('/add')
  createProducts() {
    return this.productService.addProduct();
  }
  @Delete('/delete')
  deleteAll() {
    return this.productService.deleteAll();
  }
}
