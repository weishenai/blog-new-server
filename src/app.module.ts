import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogsConfigModule } from './common/logs-config/logs-config.module';
import getConfig from './config/configuration';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exceptions/base.exceptions.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildConnectionOptions } from './common/database/dbConfig';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './common/guards/jwt.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getConfig],
    }),
    LogsConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: buildConnectionOptions,
      inject: [ConfigService],
    }),
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
