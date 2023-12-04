import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CreateArticleTagDto } from './dto/create-article-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleTag } from '../../common/database/entities/articleTag.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';

@Injectable()
export class ArticleTagService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
    @InjectRepository(ArticleTag)
    private readonly articleTagRepository: Repository<ArticleTag>,
  ) {}

  async createArticleTags(articleTags: CreateArticleTagDto[]) {
    try {
      const insertData = [];
      for (const articleTag of articleTags) {
        insertData.push(await this.articleTagRepository.create(articleTag));
      }
      const insert = this.articleTagRepository
        .createQueryBuilder()
        .insert()
        .into('article_tag')
        .values(insertData);

      const sql = insert.getSql();
      this.Logger.log(`insert article_tag sql:${sql}`);
      const insertResult = await insert.execute();
      return insertResult.raw;
    } catch (e) {
      this.Logger.log('插入文章标签失败');
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.ARTICLE,
        message: '插入文章标签失败',
      });
    }
  }
}
