import { Module } from '@nestjs/common';
import { PhotoAlbumService } from './photo-album.service';
import { PhotoAlbumController } from './photo-album.controller';

@Module({
  controllers: [PhotoAlbumController],
  providers: [PhotoAlbumService],
})
export class PhotoAlbumModule {}
