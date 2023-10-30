import { Inject, Injectable, LoggerService } from '@nestjs/common';
import {
  CreateArticleDto,
  CreateArticleParamsDtO,
  CreateArticleResultDto,
} from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Article } from '../../common/database/entities/article.entity';
import { verifyArticleParam } from './validateParams';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { ArticleCommonService } from './article-common.service';
import { TagDictionaryDTO } from '../tag/dto/query-tag.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
    private readonly articleCommonService: ArticleCommonService,
  ) {}

  /**
   * @description 添加文章
   * @param articleDto
   */
  async addArticle(articleDto: CreateArticleParamsDtO) {
    try {
      const validate = verifyArticleParam(articleDto);
      if (validate.code !== '200') {
        return new BusinessException(validate);
      }

      const { articleTitle } = articleDto;
      const hasTitle = await this.articleTitleIsExists({ articleTitle });
      if (hasTitle) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.ARTICLE,
          message: '已存在相同的文章标题',
        });
      }
      const { tagList, category, ...articleRest } = articleDto;
      // 若分类不存在 就先创建分类
      const { id, categoryName } = category;
      articleRest.categoryId =
        await this.articleCommonService.createCategoryOrReturn(
          id,
          categoryName,
        );

      let newArticle: CreateArticleResultDto | null = null,
        newArticleTagList: TagDictionaryDTO[] = [];
      newArticle = await this.createArticle(articleRest);

      // tag和标签进行关联
      newArticleTagList =
        await this.articleCommonService.createArticleTagByArticleId(
          newArticle.id,
          tagList,
        );

      return {
        message: '新增文章成功',
        data: {
          article: newArticle,
          articleTagList: newArticleTagList,
        },
      };
    } catch (e) {}
  }

  /**
   * @description 文章标题是否存在
   * @param id
   * @param articleTitle
   */
  async articleTitleIsExists({
    id,
    articleTitle,
  }: {
    id?: number;
    articleTitle: string;
  }): Promise<boolean> {
    try {
      const select = await this.articleRepository
        .createQueryBuilder('article')
        .select()
        .where('article.article_title = :article_title', {
          article_title: articleTitle,
        });

      const res = await select.getOne();
      if (res) {
        if (id) {
          return res.id != id;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } catch (e) {
      this.Logger.warn('查询文章失败');
      return false;
    }
  }

  async createArticle(article: CreateArticleDto) {
    let result;
    try {
      const temps = await this.articleRepository.create(article);
      result = await this.articleRepository.save(temps);
    } catch (e) {
      this.Logger.log('创建文章失败');
      result = null;
    }
    return result;
  }
}
