import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';
import { TagDictionaryDTO } from '../tag/dto/query-tag.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { CreateOrUpdateTagDto } from '../tag/dto/update-tag.dto';
import { ArticleTagService } from '../article-tag/article-tag.service';
import { CreateArticleTagDto } from '../article-tag/dto/create-article-tag.dto';

@Injectable()
export class ArticleCommonService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    private readonly articleTagService: ArticleTagService,
  ) {}

  /**
   * @description 新增和编辑文章关于分类的公共方法
   * @param id 分类id
   * @param categoryName 分类名称
   */
  async createCategoryOrReturn(
    id: number,
    categoryName: string,
  ): Promise<number> {
    let finalId: number;
    if (id) {
      finalId = id;
    } else {
      const category = await this.categoryService.getOneCateGory({
        id,
        categoryName,
      });
      if (category && !(category instanceof BusinessException)) {
        finalId = category.id;
      } else {
        const newCategory = await this.categoryService.createCateGory({
          categoryName,
        });
        if (newCategory && !(newCategory instanceof BusinessException)) {
          finalId = newCategory.id;
        }
      }
    }
    return finalId;
  }

  /**
   * @description  进行添加文章分类与标签关联的公共方法
   * @param articleId 文章id
   * @param tagList 标签列表
   */
  async createArticleTagByArticleId(
    articleId: number,
    tagList: CreateOrUpdateTagDto[],
  ): Promise<TagDictionaryDTO[]> {
    let resultList = [];
    // 先将新增的tag进行保存，拿到tag的id，再进行标签 文章关联
    const promiseList: { id: number; tagBane: string } = tagList.map(
      async (tag) => {
        if (!tag.id) {
          let res;
          const one = await this.tagService.getOneTag({ tagName: tag.tagName });
          if (one) {
            res = one;
          } else {
            res = await this.tagService.addTag(tag);
          }
          return res;
        }
      },
    );

    // 组装添加了标签id后的标签列表
    await Promise.all(promiseList).then((res) => {
      res.forEach((r) => {
        if (r) {
          const i = tagList.findIndex((tag) => tag.tagName == r.tagName);
          if (i != -1) {
            tagList[i].id = r.id;
          }
        }
      });
    });

    // 文章id和标签id 关联
    if (articleId) {
      const articleTagList: CreateArticleTagDto[] = tagList.map((tag) => {
        // 组装文章和标签的关联表
        return {
          articleId: articleId,
          tagId: tag.id,
        };
      });
      // 批量新增文章标签关联
      resultList =
        await this.articleTagService.createArticleTags(articleTagList);
    }

    return [];
  }
}
