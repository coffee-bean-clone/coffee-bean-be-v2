import { SetMetadata } from '@nestjs/common';
// export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(process.env.PUBLIC_KEY, true);
