import { CreateCategoryDto } from './create-category.dto';

export class QueryCategoryDto extends CreateCategoryDto {
  id?: number;
}

export const entityKeys = [
  'category.category_name',
  'category.createdAt',
  'category.updatedAt',
  'category.id',
];
