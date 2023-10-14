import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../common/database/entities/article.entity';
import { ArticleTag } from '../../common/database/entities/articleTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleTag])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
