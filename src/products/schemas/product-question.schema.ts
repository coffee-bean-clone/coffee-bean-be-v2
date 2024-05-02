import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ProductQuestion extends Document {
  @Prop({ required: true, type: Types.ObjectId }) // ObjectId 타입으로 지정
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId }) // ObjectId 타입으로 지정
  productId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Date })
  createdAt: Date | null;

  @Prop({ required: true, type: Date })
  updateAt: Date | null;

  @Prop({ required: true, type: Date })
  deleteAt: Date | null;
}

export const ProductQuestionSchema =
  SchemaFactory.createForClass(ProductQuestion);
