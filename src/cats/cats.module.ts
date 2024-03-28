// cats.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatSchema } from './schemas/cat.schema'; // CatSchema import 필요

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]), // CatModel을 등록
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
