import { Injectable } from '@nestjs/common';
import { CreateArticleTagDto } from './dto/create-article-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleTag } from '../../common/database/entities/articleTag.entity';

@Injectable()
export class ArticleTagService {
  constructor(
    @InjectRepository(ArticleTag)
    private readonly articleTagRepository: Repository<ArticleTag>,
  ) {}

  async createArticleTags(articleTags: CreateArticleTagDto[]) {}
}
