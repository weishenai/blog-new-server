import { Module } from '@nestjs/common';
import { LogsConfigService } from './logs-config.service';
import { Console } from 'winston/lib/winston/transports';
import { ConfigService } from '@nestjs/config';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { LOG_CONFIG } from '../../interface/Environment';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
function createDailyRotateTrasnport(level: string, filename: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: undefined,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config: LOG_CONFIG = configService.get('LOG_CONFIG');
        const timestamp = config?.TIMESTAMP;
        const conbine = [];
        if (timestamp) {
          conbine.push(winston.format.timestamp());
        }
        conbine.push(utilities.format.nestLike());
        const consoleTransports = new Console({
          level: config.LOG_LEVEL || 'info',
          format: winston.format.combine(...conbine),
        });

        return {
          transports: [
            consoleTransports,
            ...(config.LOG_ON
              ? [
                  createDailyRotateTrasnport('info', 'application'),
                  createDailyRotateTrasnport('warn', 'error'),
                ]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
  providers: [LogsConfigService],
})
export class LogsConfigModule {}
