import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_talk' })
export class Talk extends Base {
  @Column({
    comment: '发布说说的用户id',
    nullable: true,
    name: 'user_id',
    type: 'integer',
  })
  userId: number;

  @Column({
    comment: '说说内容',
    nullable: true,
    name: 'content',
    type: 'varchar',
    length: 255,
  })
  content: string;

  @Column({
    name: 'status',
    comment: '说说状态 1 公开 2 私密 3 回收站',
    default: 1,
    nullable: true,
  })
  status: number;

  @Column({
    name: 'is_top',
    comment: '是否置顶 1 置顶 2 不置顶',
    default: 2,
    type: 'integer',
  })
  isTop: number;

  @Column({
    type: 'integer',
    default: 0,
    comment: '点赞次数',
    name: 'like_times',
  })
  likeTimes: number;
}
