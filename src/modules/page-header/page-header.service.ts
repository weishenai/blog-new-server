import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Header } from '../../common/database/entities/header.entity';
import { UpdatePageHeaderDto } from './dto/update-page-header.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { DeletePageHeaderDto } from './dto/delete-page-header.dto';
import { pick } from '../../utils/tool';
import { entityKeys } from './dto/query-page-header.dto';

@Injectable()
export class PageHeaderService {
  constructor(
    @InjectRepository(Header)
    private readonly pageHeaderRepository: Repository<Header>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  /**
   * @description 新增/修改背景图
   * @param body
   */
  async addOrUpdate(body: UpdatePageHeaderDto) {
    try {
      const { id, routeName, bgUrl } = body;

      if (!id) {
        const flag = await this.getOneByPath(routeName);
        if (flag) {
          return new BusinessException({
            code: BUSINESS_ERROR_CODE.HEADER,
            message: '已经存在相同的背景路径',
          });
        }
      }

      if (id) {
        const flag = await this.getOneByPath(routeName);
        if (flag instanceof BusinessException) {
          return flag;
        }
        if (flag.id !== id) {
          return new BusinessException({
            code: BUSINESS_ERROR_CODE.HEADER,
            message: '已经存在相同的背景路径',
          });
        }
      }
      const res = await this.pageHeaderRepository.save(body);
      if (res) {
        return true;
      }
    } catch (e) {
      const meg = body.id ? '更新' : '新建';
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.HEADER,
        message: `${meg}背景失败`,
      });
    }
  }

  /**
   * @description 删除背景图
   */
  async delete(body: DeletePageHeaderDto) {
    try {
      const { id, url } = body;
      const res = await this.pageHeaderRepository.delete(id);
      if (url) {
        //   TODO 删除图片
      }
      if (res) {
        return { message: '删除背景成功', data: true };
      }
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.HEADER,
        message: '删除背景失败',
      });
    }
  }

  /**
   * @description 获取所有背景图
   */
  async getAll() {
    try {
      const resultKeys = pick(entityKeys, [
        'photo.createdAt',
        'photo.updatedAt',
      ]);
      const search = this.pageHeaderRepository
        .createQueryBuilder('photo')
        .select([...resultKeys])
        .addOrderBy('id', 'DESC');
      const list = await search.getMany();
      if (list) {
        return {
          message: '获取所有背景成功',
          data: list,
        };
      } else {
        return new BusinessException('获取所有背景失败');
      }
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.HEADER,
        message: '获取所有背景失败',
      });
    }
  }

  /**
   * @description 根据路由名称查询首页图片
   */
  async getOneByPath(routeName: string) {
    try {
      if (routeName) {
        const header = await this.pageHeaderRepository.findOneBy({
          routeName: routeName,
        });
        return header ?? null;
      }
      return null;
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.HEADER,
        message: '查找首页图片失败',
      });
    }
  }
}
