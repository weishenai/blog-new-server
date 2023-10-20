import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../common/database/entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { UpdateTagDto } from './dto/update-tag.dto';
import { entityKeys, QueryTagDto } from './dto/query-tag.dto';
import { pick } from '../../utils/tool';
import { DeleteTagDto } from './dto/delete-tag.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  async addTag(tag: CreateTagDto) {
    try {
      const tempTag = await this.tagRepository.create(tag);
      const res = await this.tagRepository.save(tempTag);
      this.Logger.log(`创建标签【${res}】`);
      if (res) {
        return res;
      }
      return new BusinessException({
        message: '创建失败',
        code: BUSINESS_ERROR_CODE.TAG,
      });
    } catch (e) {
      return new BusinessException({
        message: '创建失败',
        code: BUSINESS_ERROR_CODE.COMMON,
      });
    }
  }

  async updateTag(tag: UpdateTagDto) {
    try {
      const res = await this.tagRepository.save(tag);
      if (res) {
        return { message: '更新成功', res };
      }
      return new BusinessException({
        message: '更新失败',
        code: BUSINESS_ERROR_CODE.TAG,
      });
    } catch (e) {
      return new BusinessException({
        message: '创建失败',
        code: BUSINESS_ERROR_CODE.COMMON,
      });
    }
  }

  async removeTag(tagDto: DeleteTagDto) {
    try {
      const { tagId } = tagDto;
      const res = await this.tagRepository.delete(tagId);
      if (res) return { message: '删除标签成功' };
      return new BusinessException({
        message: '删除标签失败',
        code: BUSINESS_ERROR_CODE.TAG,
      });
    } catch (e) {
      return new BusinessException({
        message: '创建失败',
        code: BUSINESS_ERROR_CODE.COMMON,
      });
    }
  }

  async getTagList(params: QueryTagDto) {
    try {
      const { current, size, tagName } = params;
      const search = this.tagRepository
        .createQueryBuilder('tag')
        .select()
        .where('tag.tag_name Like :tagName', { tagName: `%${tagName ?? ''}%` })
        .skip((current - 1) * size)
        .take(size);
      const list = await search.getMany();
      const count = await search.getCount();
      return {
        record: list,
        size,
        current,
        count,
      };
    } catch (e) {
      return new BusinessException('查询标签列表失败');
    }
  }
}
