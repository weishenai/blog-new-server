import { CreatePhotoDto } from './create-photo.dto';

export class UpdatePhotoDto extends CreatePhotoDto {
  id?: number;
}

export class RevertPhotoDto {
  idList: number[];
}
