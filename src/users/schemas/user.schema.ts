import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  detailAddress: string;

  @Prop({ required: false })
  zipCode: string;

  @Prop({ required: false, unique: true })
  phoneNumber: string;

  @Prop({ type: String, default: null })
  refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
