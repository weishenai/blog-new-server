import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../common/database/entities/category.entity';
import { entityKeys, QueryCategoryDto } from './dto/query-category.dto';
import { pick } from '../../utils/tool';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { CreateCategoryDto } from './dto/create-category.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  async getOneCateGory(queryCategoryDto: QueryCategoryDto) {
    try {
      const search = await this.categoryRepository
        .createQueryBuilder('category')
        .select(pick(entityKeys, ['category.createdAt', 'category.updatedAt']));
      const { id, categoryName } = queryCategoryDto;
      let hasId = false;
      if (id) {
        search.where('category.id = :id', { id });
        hasId = true;
      }

      if (categoryName) {
        hasId
          ? search.andWhere('category.category_name = :category_name', {
              category_name: categoryName,
            })
          : search.where('category.category_name = :category_name', {
              category_name: categoryName,
            });
      }

      const category = await search.getOne();

      return category ?? null;
    } catch (e) {
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.CATEGORY,
        message: '查询分类失败',
      });
    }
  }

  async createCateGory(category: CreateCategoryDto) {
    try {
      const temp = await this.categoryRepository.create(category);
      return await this.categoryRepository.save(temp);
    } catch (e) {
      this.Logger.warn('查询分类失败');
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.CATEGORY,
        message: '查询分类失败',
      });
    }
  }
}
