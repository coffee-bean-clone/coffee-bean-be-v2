// product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  mainCategory: string;

  @Prop({ required: true })
  subCategory: string;

  @Prop({ required: true })
  isSale: boolean;

  @Prop({ required: true })
  isNew: boolean;

  @Prop({ default: null, unique: false })
  detailImage: string;

  @Prop({ required: false })
  productImages: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
