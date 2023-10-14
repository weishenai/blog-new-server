import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_like' })
export class Like extends Base {
  @Column({
    name: 'type',
    type: 'integer',
    comment: '点赞类型 1 文章 2 说说 3 留言 4 评论',
  })
  type: number;

  @Column({
    name: 'for_id',
    type: 'integer',
    comment: '点赞的id 文章id 说说id 留言id',
  })
  forId: number;

  @Column({
    name: 'user_id',
    type: 'integer',
    comment: '点赞用户id',
  })
  user_id: number;
}
