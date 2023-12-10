import { UpdatePhotoDto } from './update.photo.dto';

export class DeletePhotoDto {
  imgList: UpdatePhotoDto[];
  //  1: 回收站， 2：删除
  type: 1 | 2;
}
