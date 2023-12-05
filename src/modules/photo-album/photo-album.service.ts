import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoAlbum } from '../../common/database/entities/photoAlbum.entity';
import { CreatePhoneAlbumDto } from './dto/create-phoneAlbum.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { QueryPhoneAlbumDto } from './dto/query-phoneAlbum.dto';
import { UpdatePhoneAlbumDto } from './dto/update-phoneAlbum.dto';
import { message } from 'memfs/lib/internal/errors';

@Injectable()
export class PhotoAlbumService {
  constructor(
    @InjectRepository(PhotoAlbum)
    private readonly photoAlbumRepository: Repository<PhotoAlbum>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  /**新建相册*/
  async addPhotoAlbum(body: CreatePhoneAlbumDto) {
    try {
      const PhotoAlbum = await this.photoAlbumRepository.findOneBy({
        albumName: body.albumName,
      });
      if (PhotoAlbum) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.PHOTO_ALBUM,
          message: '此相册已存在',
        });
      }
      const tempTag = await this.photoAlbumRepository.create(body);
      const res = await this.photoAlbumRepository.save(tempTag);
      this.Logger.log(`创建相册【${res}】`);
      if (res) {
        return res;
      }
      return new BusinessException({
        message: '创建失败',
        code: BUSINESS_ERROR_CODE.PHOTO_ALBUM,
      });
    } catch (e) {
      return new BusinessException({
        message: '创建失败',
        code: BUSINESS_ERROR_CODE.COMMON,
      });
    }
  }

  /**查询相册*/
  async getPhotoAlbum(params: QueryPhoneAlbumDto) {
    const { current, size, albumName } = params;
    const search = this.photoAlbumRepository
      .createQueryBuilder('phone_album')
      .select()
      .where('phone_album.album_name Like :albumName', {
        albumName: `%${albumName ?? ''}%`,
      })
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
  }

  // 获取相册列表
  async getPhotoAlbumList() {
    try {
      const search = this.photoAlbumRepository
        .createQueryBuilder('phone_album')
        .select()
        .addOrderBy('createdAt', 'DESC');

      return await search.getMany();
    } catch (e) {
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.PHOTO_ALBUM,
        message: '查询相册列表失败',
      });
    }
  }

  async deletePhoneAlbum(id: number) {
    try {
      const findOne = await this.photoAlbumRepository.findOneBy({ id });
      if (findOne) {
        //TODO 删除图片资源
      }
      const result = await this.photoAlbumRepository.delete(id);
      if (result) return { message: '删除相册成功' };
      return new BusinessException({
        message: '删除相册失败',
        code: BUSINESS_ERROR_CODE.PHOTO_ALBUM,
      });
    } catch (e) {
      this.Logger.error(`删除相册失败:${e}`);
      return new BusinessException({
        message: '删除失败',
        code: BUSINESS_ERROR_CODE.COMMON,
      });
    }
  }

  // 更新相册
  async updatePhoneAlbum(body: UpdatePhoneAlbumDto) {
    try {
      const { id, albumCover, albumName } = body;
      if (!id) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.PHOTO_ALBUM,
          message: '更新相册缺少必要信息',
        });
      }
      const findOne = await this.photoAlbumRepository.findOneBy({ albumName });
      if (findOne && findOne.id !== id) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.PHOTO_ALBUM,
          message: '已经存在相同的相册名称，换一个试试',
        });
      }
      const findOneById = await this.photoAlbumRepository.findOneBy({ id });
      if (!findOneById) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.PHOTO_ALBUM,
          message: '当前相册不存在',
        });
      }
      //   TODO 删除相册对应的资源
      if (albumCover !== findOneById.albumCover) {
      }

      const result = await this.photoAlbumRepository.update(id, body);
      if (result) {
        return true;
      }
      this.Logger.warn(`${result}`);
      return false;
    } catch (e) {
      this.Logger.error('e', e.message());
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.PHOTO_ALBUM,
        message: '更新相册失败',
      });
    }
  }
}
