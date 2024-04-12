import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  private readonly categories: { endPoint: string; categoryName: string }[] = [
    {
      endPoint: 'stick_coffee',
      categoryName: '스틱 커피',
    },
    {
      endPoint: 'powder_coffee',
      categoryName: '분쇄형 커피',
    },
    {
      endPoint: 'pouch_and_cup_coffee',
      categoryName: '파우치&컵 커피',
    },
    {
      endPoint: 'capsule_coffee',
      categoryName: '캡슐 커피',
    },
    {
      endPoint: 'tea',
      categoryName: '티',
    },
    {
      endPoint: 'goods',
      categoryName: '상품',
    },
    {
      endPoint: 'drip_bag',
      categoryName: '드립백',
    },
    {
      endPoint: 'pouch_coffee',
      categoryName: '파우치 커피',
    },
    {
      endPoint: 'cup_coffee',
      categoryName: '컵 커피',
    },
    {
      endPoint: 'nespresso',
      categoryName: '네스프레소 호환용',
    },
    {
      endPoint: 'cbtl',
      categoryName: 'CBTL 호환용',
    },
    {
      endPoint: 'classic_tea',
      categoryName: '클래식 티',
    },
    {
      endPoint: 'herbal_tea',
      categoryName: '허브 티',
    },
    {
      endPoint: 'fruit_tea',
      categoryName: '프룻 티',
    },
    {
      endPoint: 'ice_tumbler',
      categoryName: '아이스 텀블러',
    },
    {
      endPoint: 'warm_tumbler',
      categoryName: '보온 텀블러',
    },
    {
      endPoint: 'mug',
      categoryName: '머그',
    },
  ];

  constructor() {}

  findCategoryName(endPoint: string): string {
    const match = this.categories.find(
      (category) => category.endPoint === endPoint,
    );
    return match ? match.categoryName : null;
  }
}
