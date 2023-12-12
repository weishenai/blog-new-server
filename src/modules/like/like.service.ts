import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Like } from '../../common/database/entities/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  //点赞
  async addLike(body: CreateLikeDto) {
    try {
      const { forId, type, userId } = body;
      if (!forId) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.LIKE,
          message: '点赞对象不能为空',
        });
      }

      if (!type) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.LIKE,
          message: '点赞类型不能为空',
        });
      }
      let res: Like | boolean = false;
      if (userId) {
        const temp = await this.likeRepository.create({ forId, type, userId });
        res = await this.likeRepository.save(temp);
      }
      return { message: `${res ? '点赞成功' : '点赞失败'}`, data: res };
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.LIKE,
        message: '添加点赞失败',
      });
    }
  }

  // 取消点赞
  async cancelLike(body: CreateLikeDto) {
    try {
      const { forId, type, userId } = body;
      if (!forId) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.LIKE,
          message: '点赞对象不能为空',
        });
      }

      if (!type) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.LIKE,
          message: '点赞类型不能为空',
        });
      }
      let res: DeleteResult | boolean = false;
      if (userId) {
        const builder = this.likeRepository
          .createQueryBuilder('like')
          .delete()
          .from(Like)
          .where('for_id = :forId', { forId })
          .andWhere('type = :type', { type })
          .andWhere('user_id = :userId', { userId });

        this.Logger.log('sql:', builder.getSql());
        res = await builder.execute();
      }
      return { message: `${res ? '取消点赞成功' : '取消点赞失败'}`, data: res };
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.LIKE,
        message: '取消点赞失败',
      });
    }
  }

  // 获取当前用户对当前文章/说说/留言 是否点赞
  async getIsLikeByIdAndType(body: CreateLikeDto) {
    try {
      const { forId, type, userId } = body;
      if (!forId) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.LIKE,
          message: '点赞对象不能为空',
        });
      }

      if (!type) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.LIKE,
          message: '点赞类型不能为空',
        });
      }
      let res;
      if (!userId) {
        res = false;
      } else {
        res = await this.likeRepository.findBy({ forId, type, userId });
      }
      return { message: '获取用户是否点赞成功', data: res };
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.LIKE,
        message: '获取用户是否点赞失败',
      });
    }
  }
}
