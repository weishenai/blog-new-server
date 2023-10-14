import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_notify' })
export class Notify extends Base {
  @Column({
    type: 'varchar',
    length: 555,
    comment: '通知内容',
    name: 'message',
  })
  message: string;

  @Column({
    type: 'integer',
    comment: '通知给谁',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'integer',
    comment: '通知类型 1 文章 2 说说 3 留言 4 友链',
    name: 'type',
  })
  type: number;

  @Column({
    type: 'integer',
    comment: '说说或者是文章的id 用于跳转',
    name: 'to_id',
  })
  toId: number;

  @Column({
    type: 'integer',
    comment: '是否被查看 1 没有 2 已经查看',
    name: 'is_view',
    default: 1,
  })
  isView: number;
}
