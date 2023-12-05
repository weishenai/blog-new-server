import { CreatePhoneAlbumDto } from './create-phoneAlbum.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePhoneAlbumDto extends PartialType(CreatePhoneAlbumDto) {
  id?: number;
}
