import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_photo_album' })
export class PhotoAlbum extends Base {
  @Column({
    name: 'album_name',
    comment: '相册名称',
    type: 'varchar',
    length: 26,
  })
  albumName: string;

  @Column({
    name: 'description',
    comment: '相册描述信息',
    type: 'varchar',
    length: 55,
  })
  description: string;

  @Column({
    name: 'album_cover',
    comment: '相册封面',
    type: 'varchar',
    length: 555,
  })
  albumCover: string;
}
