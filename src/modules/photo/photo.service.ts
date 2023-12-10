import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Photo } from '../../common/database/entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { DeletePhotoDto } from './dto/delete-photo.dto';
import { RevertPhotoDto } from './dto/update.photo.dto';
import { pick } from '../../utils/tool';

import { entityKeys, QueryPhotoDto } from './dto/query.photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}
  async add(body: CreatePhotoDto[]) {
    try {
      const photos = body.map((photo) => {
        return this.photoRepository.create(photo);
      });
      const result = await this.photoRepository.save(photos);
      if (result) {
        return true;
      }
    } catch (e) {
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.PHOTO,
        message: '新增图片失败',
      });
    }
  }

  async delete(body: DeletePhotoDto) {
    try {
      const { imgList, type } = body;
      const idList: Array<number> = imgList.map(({ id }) => id);
      let res;
      if (type === 1) {
        res = await this.photoRepository.update(idList, { status: 2 });
      } else if (type === 2) {
        res = await this.photoRepository.delete(idList);
      }
      //   TODO 删除图片资源
      return { message: '删除图片成功', data: res };
    } catch (e) {
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.PHOTO,
        message: '删除图片失败',
      });
    }
  }

  async revert(body: RevertPhotoDto) {
    try {
      const { idList } = body;
      const res = await this.photoRepository.update(idList, { status: 1 });
      return { message: '恢复图片成功', data: res };
    } catch (e) {
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.PHOTO,
        message: '恢复图片失败',
      });
    }
  }

  async getPhotosByAlbumId(body: QueryPhotoDto) {
    try {
      const { current, size, id, status } = body;
      const resultKeys = pick(entityKeys, []);
      const search = this.photoRepository
        .createQueryBuilder('photo')
        .select([...resultKeys])
        .where('photo.album_id = :id', { id })
        .andWhere('photo.status = :status', { status })
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
      }
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException('获取相册图片失败');
    }
  }

  async getAllPhotosByAlbumId(id: number) {
    try {
      const resultKeys = pick(entityKeys, []);
      const search = this.photoRepository
        .createQueryBuilder('photo')
        .select([...resultKeys])
        .where('photo.album_id = :id', { id })
        .andWhere('photo.status = :status', { status: 1 })
        .orderBy({ createdAt: 'DESC' });
      const res = await search.getMany();
      return { data: res, message: '获取相册所有照片成功' };
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.PHOTO,
        message: '获取相册所有照片失败',
      });
    }
  }
}
