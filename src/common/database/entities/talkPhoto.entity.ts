import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_talk_photo' })
export class TalkPhoto extends Base {
  @Column({
    name: 'talk_id',
    comment: '说说的id',
    type: 'integer',
    nullable: true,
  })
  talkId: number;

  @Column({
    name: 'url',
    comment: '图片地址',
    type: 'varchar',
    length: 255,
    default: '',
    nullable: true,
  })
  url: string;
}
