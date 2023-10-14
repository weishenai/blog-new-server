import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from '../../common/database/entities/links.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Links])],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
