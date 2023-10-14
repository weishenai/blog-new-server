import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_message' })
export class Message extends Base {
  @Column({
    name: 'tag',
    comment: '标签',
    type: 'varchar',
  })
  tag: string;

  @Column({
    name: 'message',
    comment: '留言内容',
    length: 555,
    type: 'varchar',
  })
  message: string;

  @Column({
    name: 'color',
    comment: '字体颜色',
    type: 'varchar',
  })
  color: string;

  @Column({
    name: 'font_size',
    comment: '字体大小',
    default: 12,
    type: 'integer',
  })
  fontSize: number;

  @Column({
    name: 'bg_color',
    comment: '背景颜色',
    type: 'varchar',
  })
  bgColor: string;

  @Column({
    name: 'bg_url',
    comment: '背景图片',
    type: 'varchar',
  })
  bgUrl: string;

  @Column({
    name: 'user_id',
    comment: '留言用户的id',
    type: 'integer',
  })
  userId: number;

  @Column({
    name: 'like_times',
    comment: '游客用户的昵称',
    type: 'integer',
  })
  likeTimes: number;

  @Column({
    name: 'font_weight',
    comment: '字体宽度',
    type: 'integer',
    default: 500,
  })
  fontWeight: number;

  @Column({
    name: 'nick_name',
    comment: '游客用户的昵称',
    type: 'varchar',
  })
  nickName: string;
}
