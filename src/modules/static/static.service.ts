import { Inject, Injectable, LoggerService } from '@nestjs/common';
import path, { join } from 'path';
import fs from 'fs';
import { createWriteStream } from 'fs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { BusinessException } from '../../common/exceptions/business.exception';

@Injectable()
export class StaticService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  //删除文件
  async deleteOnlineImgs(imgList: string[]) {
    Array.isArray(imgList) &&
      imgList.length &&
      imgList.forEach((v) => {
        if (v) {
          const filePath = path
            .join(__dirname, '../../../public/onLine' + v)
            .replace('/controller/utils', '');
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
  }

  async uploadFile(multipart) {
    try {
      const time = new Date().getTime();
      const filename = time + '_' + multipart['file'][0].filename;
      const data = multipart['file'][0].data;

      //文件上传路径
      const path = join(__dirname, '../../../public/onLine/');

      const writerStream = createWriteStream(path + filename);
      writerStream.write(data);
      await writerStream.end();

      return {
        success: 1,
        message: 'success',
        url: '/upload/' + filename, //此处为返回给前端的文件路径，前端可以通过此URL访问到文件
      };
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException('文件上传失败');
    }
  }

  async isValidUrl(url) {
    return url.indexOf('http') != -1 || url.indexOf('https') != -1;
  }
}
