import { Controller } from '@nestjs/common';
import { PhotoAlbumService } from './photo-album.service';

@Controller('photo-album')
export class PhotoAlbumController {
  constructor(private readonly photoAlbumService: PhotoAlbumService) {}
}
