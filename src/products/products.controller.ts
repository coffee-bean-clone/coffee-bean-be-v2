import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Body,
  Query,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { ProductQuestionService } from 'src/product-question/product-question.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProductCartService } from 'src/product-cart/product-cart.service';
import { REQ } from './dto';
import {
  ApiSwaggerApiBody,
  ApiSwaggerApiParam,
  ApiSwaggerBearerAuth,
  ApiSwaggerOperation,
} from 'src/shared/decorators/swagger.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productQuestionService: ProductQuestionService,
    private readonly productCartService: ProductCartService,
  ) {}

  @Get('')
  @ApiSwaggerOperation(
    '무한스크롤 상품 불러오기',
    '마지막 id를 이용해서 limit개 만큼의 상품을 반환합니다.',
  )
  @ApiQuery({
    name: 'limit',
    example: 10,
    description: `
    몇개의 상품을 가져올지 지정합니다.
    지정하지 않을 시 10으로 고정 됩니다.
    `,
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    example: null || '65fc29dc3f95892a6c88d391',
    description: `
    마지막 요소의 id 전달하면,
    그 다음으로부터 limit개 만큼의 상품을 반환합니다.
     `,
  })
  async findCursor(
    @Query('limit') limit: number,
    @Query('cursor') cursor?: string,
  ) {
    const result = await this.productService.findCursor(limit, cursor);
    return result;
  }

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
    const result = await this.productService.deleteAll();
    return result;
  }

  @Post('/question/add')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerBearerAuth()
  @ApiSwaggerApiBody(REQ.ProductQuestionCreateDTO)
  async addProductQuestion(
    @Body() productCreateDTO: REQ.ProductQuestionCreateDTO,
  ) {
    const result =
      await this.productQuestionService.addProductQuestion(productCreateDTO);
    return result;
  }

  @Get('/question/:userId')
  @ApiSwaggerOperation('유저가 작성한 문의')
  async findUserProductQuestions(@Param('userId') userId: string) {
    const result =
      await this.productQuestionService.findUserProductQuestions(userId);
    return result;
  }

  @Get('/question/:productId')
  @ApiSwaggerOperation('상품 별 문의')
  async findProductQuestionsByProduct(@Param('productId') productId: string) {
    const result =
      await this.productQuestionService.findProductQuestionsByProduct(
        productId,
      );
    return result;
  }

  @Get('/question/:questionId')
  @ApiSwaggerOperation('상품문의 상세보기')
  async findProductQuestionDetail(@Param('questionId') questionId: string) {
    const result =
      await this.productQuestionService.findProductQuestionDetail(questionId);
    return result;
  }

  @Delete('/question/remove/:questionId')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerBearerAuth()
  async removeProductQuestion(@Param('questionId') questionId: string) {
    const result =
      await this.productQuestionService.removeProductQuestion(questionId);
    return result;
  }

  @Post('/cart/add')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerBearerAuth()
  @ApiSwaggerOperation('장바구니 추가')
  @ApiSwaggerApiBody(REQ.ProcuctCartAddDTO)
  async addProductCart(@Body() productCartAddDTO: REQ.ProcuctCartAddDTO) {
    const result =
      await this.productCartService.addProductCart(productCartAddDTO);
    if (!result) throw Error('장바구니 등록 실패');
    return { isSucces: true, result: result };
  }

  @Get('/cart/:userId')
  @ApiSwaggerApiParam('userId', '660bb5864146c96c02c47978')
  @ApiSwaggerOperation('유저의 장바구니')
  async findProductCartsByUser(@Param('userId') userId: string) {
    const result = await this.productCartService.findProductCartsByUser(userId);
    if (result.length === 0)
      return { isEmpty: true, result, length: result.length };
    return { isSucces: true, result, length: result.length };
  }

  @Get('/cart/:userId/:productId')
  @ApiSwaggerApiParam('productId', '65fc29dc3f95892a6c88d369')
  @ApiSwaggerOperation('상품 별 장바구니 ??? 무슨필요')
  async find(@Param('productId') productId: string) {
    const result =
      await this.productCartService.findProductCartsByProduct(productId);
    if (result.length === 0)
      return { isEmpty: true, result, length: result.length };
    return { isSucces: true, result, length: result.length };
  }
  @Get('/cart/:productId')
  @ApiSwaggerApiParam('productId', '65fc29dc3f95892a6c88d369')
  @ApiSwaggerOperation('상품 별 장바구니 ??? 무슨필요')
  async findProductCartsByProduct(@Param('productId') productId: string) {
    const result =
      await this.productCartService.findProductCartsByProduct(productId);
    if (result.length === 0)
      return { isEmpty: true, result, length: result.length };
    return { isSucces: true, result, length: result.length };
  }

  @Delete('/cart/remove/:_id')
  // @UseGuards(JwtAuthGuard)
  // @ApiSwaggerBearerAuth()
  @ApiSwaggerOperation('장바구니 삭제')
  @ApiSwaggerApiParam('_id', '6632d79507e2c27d8abf9fe9')
  async removeProductCart(@Param('_id') _id: string) {
    const result = await this.productCartService.removeProductCart(_id);
    if (!result) throw Error('장바구니 삭제 실패');
    return { isSucces: true, result };
  }
}
