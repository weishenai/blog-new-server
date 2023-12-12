import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Config } from '../../common/database/entities/config.entity';
import { BusinessException } from '../../common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { UpdateConfigDto } from './dto/update-config.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  async updateConfig(body: UpdateConfigDto) {
    try {
      const res = await this.configRepository.save(body);
      return { message: '修改网站设置成功', data: !!res };
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.CONFIG,
        message: '修改网站设置失败',
      });
    }
  }

  async getConfig() {
    try {
      return await this.configRepository.find();
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.CONFIG,
        message: '查询网站配置失败',
      });
    }
  }

  async addView() {
    try {
      const result = await this.configRepository.find();
      if (result.length) {
        await this.configRepository.increment(result[0], 'viewTime', 1);
        return { message: '增加访问量成功' };
      }
    } catch (e) {
      this.Logger.warn('e', e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.CONFIG,
        message: '增加网站访问量失败',
      });
    }
  }
}
