import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { ProductQuestionService } from 'src/product-question/product-question.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProductCartService } from 'src/product-cart/product-cart.service';
import { REQ } from './dto';
import { ApiSwaggerApiBody } from 'src/shared/decorators/swagger.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productQuestionService: ProductQuestionService,
    private readonly productCartService: ProductCartService,
  ) {}
  @Get('/all')
  @Public()
  async findAll() {
    return this.productService.findAll();
  }
  @Get('/new')
  async findNew() {
    return this.productService.findNew();
  }
  @Get('/sale')
  async findSale() {
    return this.productService.findSale();
  }
  @Get('/category/:mainCategory')
  async findMain(@Param('mainCategory') mainCategory: string) {
    console.log(mainCategory);
    return this.productService.findMain(mainCategory);
  }
  @Get('/category/:mainCategory/:subCategory')
  async findSub(
    @Param('mainCategory') mainCategory: string,
    @Param('subCategory') subCategory: string,
  ) {
    console.log(mainCategory, subCategory);
    return this.productService.findSub(mainCategory, subCategory);
  }
  @Post('/add')
  async addProduct() {
    return this.productService.addProduct();
  }
  @Delete('/delete')
  async deleteAll() {
    return this.productService.deleteAll();
  }

  @Post('/question/add')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerApiBody(REQ.ProductQuestionCreateDTO)
  async addProductQuestion(
    @Body() productCreateDTO: REQ.ProductQuestionCreateDTO,
  ) {
    return this.productQuestionService.addProductQuestion(productCreateDTO);
  }

  @Get('/question/:userId')
  async findUserProductQuestions(@Param('userId') userId: string) {
    return this.productQuestionService.findUserProductQuestions(userId);
  }

  @Get('/question/:productId')
  async findProductQuestionsByProduct(@Param('productId') productId: string) {
    return this.productQuestionService.findProductQuestionsByProduct(productId);
  }

  @Get('/question/:questionId')
  async findProductQuestionDetail(@Param('questionId') questionId: string) {
    console.log(questionId);
    return this.productQuestionService.findProductQuestionDetail(questionId);
  }

  @Delete('/question/remove/:questionId')
  async removeProductQuestion(@Param('questionId') questionId: string) {
    return this.productQuestionService.removeProductQuestion(questionId);
  }

  @Post('/cart/add')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerApiBody(REQ.ProcuctCartAddDTO)
  async addProductCart(@Body() productCartAddDTO: REQ.ProcuctCartAddDTO) {
    await this.productCartService.addProductCart(productCartAddDTO);
    return { isSucces: true };
  }
}
