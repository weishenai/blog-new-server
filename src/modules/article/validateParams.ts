import { CreateArticleDto } from './dto/create-article.dto';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';

/**
 * @description 校验文章参数
 * @param article
 */
export function verifyArticleParam(article: CreateArticleDto): {
  code: string;
  message: string;
} {
  const { articleTitle, authorId, category, article_content, tagList } =
    article;
  if (!category) {
    console.error('文章分类必传');
    return {
      code: BUSINESS_ERROR_CODE.ARTICLE,
      message: '文章分类必传',
    };
  }
  const { category_name } = category;
  if (!articleTitle || !authorId || !category_name || !article_content) {
    console.error('文章参数校验错误');
    return {
      code: BUSINESS_ERROR_CODE.ARTICLE,
      message: '文章参数校验错误',
    };
  }
  if (!tagList.length) {
    return {
      code: BUSINESS_ERROR_CODE.ARTICLE,
      message: '文章标签不能为空',
    };
  }

  return { code: '200', message: '校验成功' };
}
