import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ProductCart extends Document {
  @Prop({ required: true, type: Types.ObjectId }) // ObjectId 타입으로 지정
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId }) // ObjectId 타입으로 지정
  productId: Types.ObjectId;

  @Prop({ required: true, type: Date })
  createAt: Date;
}

export const ProductCartSchema = SchemaFactory.createForClass(ProductCart);
