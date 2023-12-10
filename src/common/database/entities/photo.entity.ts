import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_photo' })
export class Photo extends Base {
  @Column({
    name: 'album_id',
    comment: '相册 id 属于哪个相册',
    type: 'integer',
  })
  albumId: number;

  @Column({
    name: 'url',
    comment: '图片地址',
    type: 'varchar',
    length: 555,
  })
  url: string;

  @Column({
    name: 'status',
    comment: '状态 1 正常 2 回收站',
    type: 'integer',
    default: 1,
  })
  status: number;
}
