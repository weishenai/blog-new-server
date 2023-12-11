import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { UpdateLinksDto } from './dto/update-links.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Links } from '../../common/database/entities/links.entity';
import { NotifyService } from '../notify/notify.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { pick } from '../../utils/tool';
import { entityKeys } from '../user/dto/query-user.dto';
import { QueryLinksDto } from './dto/query-links.dto';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Links)
    private readonly linksRepository: Repository<Links>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
    private readonly notifyService: NotifyService,
  ) {}

  /**
   * @description 新增或者更新
   */
  async addOrUpdateLinks(body: UpdateLinksDto) {
    try {
      const { id, siteName } = body;
      const temp = await this.linksRepository.create(body);
      const res = await this.linksRepository.save(temp);
      if (!id) {
        await this.notifyService.addNotify({
          userId: 1,
          type: 4,
          message: `您的收到了来自于：${siteName} 的友链申请，点我去后台审核！`,
          toId: 0,
          isView: 1,
        });
      }
      const msg = id ? '修改' : '发布';
      return { message: `${msg}友链成功`, data: res };
    } catch (e) {
      const msg = body.id ? '修改' : '发布';
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.LINKS,
        message: `${msg}友链失败`,
      });
    }
  }

  /**
   * @description 删除友链
   */
  async deleteLinks(idList: number[]) {
    try {
      const res = await this.linksRepository.delete(idList);
      if (res) return { message: '删除友链成功', data: res };
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.LINKS,
        message: '删除友链失败',
      });
    }
  }

  /**
   * @description 批量审核友链
   */
  async approveLinks(idList: number[]) {
    try {
      const res = await this.linksRepository.update(idList, { status: 2 });
      if (res) {
        return { message: '审核友链成功', data: true };
      }
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.LINKS,
        message: '审核友链失败',
      });
    }
  }

  /**
   * @description 分页获取友链
   */
  async getLinksList(body: QueryLinksDto) {
    try {
      const { current, size, siteName, status, time } = body;
      const search = this.linksRepository
        .createQueryBuilder('links')
        .select()
        .where('links.site_name Like :siteName', { siteName: `%${siteName}%` });
      if (status) {
        search.andWhere('links.status = :status', { status });
      }
      if (time) {
        search.andWhere('links.createdAt = :time', { time });
      }
      search
        .addOrderBy('createdAt', 'ASC')
        .skip((current - 1) * size)
        .take(size);
      const list = await search.getMany();
      const count = await search.getCount();
      if (list) {
        return {
          record: list,
          size,
          current,
          count,
        };
      } else {
        return new BusinessException('查询友链失败');
      }
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.LINKS,
        message: '查询友链失败',
      });
    }
  }
}
