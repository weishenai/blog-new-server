import { Module } from '@nestjs/common';
import { PhotoAlbumService } from './photo-album.service';
import { PhotoAlbumController } from './photo-album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoAlbum } from '../../common/database/entities/photoAlbum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoAlbum])],
  controllers: [PhotoAlbumController],
  providers: [PhotoAlbumService],
})
export class PhotoAlbumModule {}
