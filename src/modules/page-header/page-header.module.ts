import { Module } from '@nestjs/common';
import { PageHeaderService } from './page-header.service';
import { PageHeaderController } from './page-header.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Header } from '../../common/database/entities/header.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Header])],
  controllers: [PageHeaderController],
  providers: [PageHeaderService],
})
export class PageHeaderModule {}
