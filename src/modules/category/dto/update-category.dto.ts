import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  id: number;
}

export class createOrUpdateCategory extends CreateCategoryDto {
  id?: number;
}
