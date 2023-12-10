import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Notify } from '../../common/database/entities/notify.entity';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { QueryNotifyDto } from './dto/query-notify.dto';
import { CreateNotifyDto } from './dto/create-notify.dto';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(Notify)
    private readonly notifyRepository: Repository<Notify>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  async updateNotify(id: number) {
    try {
      const res = await this.notifyRepository.update(id, { isView: 2 });
      return !!res;
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.NOTIFY,
        message: '更新消息失败',
      });
    }
  }

  async deleteNotifys(id: number) {
    try {
      const res = await this.notifyRepository.delete(id);
      return { message: '删除消息通知成功', data: res };
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.NOTIFY,
        message: '删除消息通知失败',
      });
    }
  }

  async getNotifyList(body: QueryNotifyDto) {
    try {
      const { current, size, userId } = body;
      const search = this.notifyRepository
        .createQueryBuilder('notify')
        .select()
        .where('notify.user_id = :userId', { userId })
        .skip((current - 1) * size)
        .take(size)
        .orderBy('isView', 'ASC')
        .orderBy('createdAt', 'ASC');
      const list = await search.getMany();
      const count = await search.getCount();
      if (list) {
        return {
          record: list,
          size,
          current,
          count,
        };
      }
    } catch (e) {
      this.Logger.warn('e', e);
    }
  }

  /***
   * @description 增加通知
   */
  async addNotify(body: CreateNotifyDto) {
    try {
      const temp = await this.notifyRepository.create(body);
      if ('isView' in temp) {
        temp.isView = 1;
      }
      const res = await this.notifyRepository.save(temp);
      return !!res;
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.NOTIFY,
        message: '新建消息失败',
      });
    }
  }
}
