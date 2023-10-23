import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleParamsDtO } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/add')
  async addArticle(@Body() articleDto: CreateArticleParamsDtO) {
    return await this.articleService.addArticle(articleDto);
  }
}
