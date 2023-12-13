import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function buildConnectionOptions(configService: ConfigService) {
  const config = configService.get('DATABASE');
  const logFlag = configService.get('LOG_CONFIG')['LOG_ON'] === 'true';

  // 扫描文件夹下所有 mysql.entity.ts 后缀结尾的文件
  const entitiesDir =
    process.env.NODE_ENV === 'env.local'
      ? [join(__dirname, 'entities') + '/**/*.entity.{js,ts}']
      : [join(__dirname, 'entities') + '/**/*.entity.{js,ts}'];
  console.log('entitiesDir', entitiesDir);
  return {
    ...config,
    entities: entitiesDir,
    logging: logFlag,
  } as TypeOrmModuleOptions;
}
