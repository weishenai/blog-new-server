import { CreateOrUpdateTagDto } from '../../tag/dto/update-tag.dto';
import { createOrUpdateCategory } from '../../category/dto/update-category.dto';

export class CreateArticleDto {
  articleTitle: string;

  articleId: number;

  articleContent: string;

  categoryId?: number;
  articleCover: string;

  isTop: number;

  authorId?: number;

  status: number;

  type: number;

  originUrl: string;

  viewTimes: number;

  articleDescription: string;

  thumbsUpTimes: number;

  readingDuration: number;
}

export class CreateArticleParamsDtO extends CreateArticleDto {
  category: createOrUpdateCategory;
  tagList: CreateOrUpdateTagDto[];
}

export class CreateArticleResultDto extends CreateArticleDto {
  id: number;
}
