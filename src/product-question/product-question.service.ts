import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductQuestion } from 'src/products/schemas/product-question.schema';
import { REQ } from '../products/dto/index';

@Injectable()
export class ProductQuestionService {
  constructor(
    @InjectModel(ProductQuestion.name)
    private readonly productQuestionModel: Model<ProductQuestion>,
  ) {}
  async addProductQuestion(
    productQuestionCreateDTO: REQ.ProductQuestionCreateDTO,
  ) {
    const question = new this.productQuestionModel({
      ...productQuestionCreateDTO,
      createdAt: new Date(),
    });
    return await question.save();
  }

  async findUserProductQuestions(productQuestionId: string) {
    const question = await this.productQuestionModel.findOne({
      _id: productQuestionId,
    });
    return question;
  }
  async findProductQuestionsByProduct(userId: string) {
    const questions = await this.productQuestionModel.find({ userId: userId });
    return questions;
  }
  async findProductQuestionDetail(productId: string) {
    const questions = await this.productQuestionModel.find({
      productId: productId,
    });
    return questions;
  }
  async removeProductQuestion(questionId: string) {
    const deleteQuestion =
      await this.productQuestionModel.findByIdAndDelete(questionId);
    return deleteQuestion;
  }
}
