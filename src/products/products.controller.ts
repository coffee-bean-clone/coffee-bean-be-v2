import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductQuestionCreateDTO } from './dto/productQuestion/ProductQuestionCreateDTO';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Product')
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

  @Post('/question/add')
  @UseGuards(JwtAuthGuard)
  createQuestion(@Body() productCreateDTO: ProductQuestionCreateDTO) {
    return this.productService.addProductQuestion(productCreateDTO);
  }

  @Get('/question/:questionId')
  getProductQuestion(@Param('qudstionId') questionId: string) {
    return this.productService.findProductQuestion(questionId);
  }

  @Get('/question/:userId')
  getUserCreatedProductQuestion(@Param('userId') userId: string) {
    return this.productService.findUserCreatedProductQuestions(userId);
  }

  @Get('/question/:productId')
  getProductQuestions(@Param('productId') productId: string) {
    return this.productService.findProductQuestions(productId);
  }
}
