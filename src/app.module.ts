import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { ProductQuestionModule } from './product-question/product-question.module';
import { ProductCartService } from './product-cart/product-cart.service';
import { ProductCartModule } from './product-cart/product-cart.module';
import { UserSchema } from './users/schemas/user.schema';
import { ProductCartSchema } from './products/schemas/product-cart.schema';
import { ProductQuestionSchema } from './products/schemas/product-question.schema';
import { ProductSchema } from './products/schemas/procuct.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'ProductCart', schema: ProductCartSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'ProductQuestion', schema: ProductQuestionSchema },
    ]),
    UsersModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    ProductQuestionModule,
    ProductCartModule,
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [
    AppService,
    CategoryService,
    AuthService,
    JwtService,
    ProductCartService,
  ],
})
export class AppModule {}
