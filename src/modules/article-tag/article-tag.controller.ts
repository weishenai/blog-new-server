import { Controller } from '@nestjs/common';
import { ArticleTagService } from './article-tag.service';

@Controller('article-tag')
export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) {}
}
