import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../common/database/entities/article.entity';
import { ArticleTag } from '../../common/database/entities/articleTag.entity';
import { ArticleCommonService } from './article-common.service';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { ArticleTagModule } from '../article-tag/article-tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleTag]),
    CategoryModule,
    TagModule,
    ArticleTagModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleCommonService],
  exports: [],
})
export class ArticleModule {}
