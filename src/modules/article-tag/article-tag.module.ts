import { Module } from '@nestjs/common';
import { ArticleTagService } from './article-tag.service';
import { ArticleTagController } from './article-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTag } from '../../common/database/entities/articleTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleTag])],
  controllers: [ArticleTagController],
  providers: [ArticleTagService],
  exports: [ArticleTagService],
})
export class ArticleTagModule {}
