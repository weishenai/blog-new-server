import { Module } from '@nestjs/common';
import { PageHeaderService } from './page-header.service';
import { PageHeaderController } from './page-header.controller';

@Module({
  controllers: [PageHeaderController],
  providers: [PageHeaderService],
})
export class PageHeaderModule {}
