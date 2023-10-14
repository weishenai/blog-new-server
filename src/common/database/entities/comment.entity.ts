import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_comment' })
export class Comment extends Base {
  @Column({
    name: 'parent_id',
    comment: '评论父级id',
    type: 'integer',
  })
  parentId: number;

  @Column({
    name: 'for_id',
    type: 'integer',
    comment: '评论的对象id 比如说说id、文章id等',
  })
  forId: number;

  @Column({
    name: 'type',
    type: 'integer',
    comment: '评论类型 1 文章 2 说说 3 留言 ...',
  })
  type: number;

  @Column({
    name: 'from_id',
    type: 'integer',
    comment: '评论人id',
  })
  fromId: number;

  @Column({
    type: 'varchar',
    comment: '评论人昵称',
    name: 'from_name',
  })
  fromName: string;

  @Column({
    type: 'varchar',
    length: '255',
    comment: '评论人头像',
    name: 'from_avatar',
  })
  fromAvatar: string;

  @Column({
    type: 'integer',
    name: 'to_id',
    comment: '被回复的人id',
  })
  toId: number;

  @Column({
    name: 'to_name',
    type: 'varchar',
    comment: '被回复人的昵称',
  })
  toName: string;

  @Column({
    type: 'varchar',
    length: 555,
    comment: '被回复人的头像',
    name: 'to_avatar',
  })
  toAvatar: string;

  @Column({
    type: 'varchar',
    length: 555,
    comment: '评论内容',
    name: 'content',
  })
  content: string;

  @Column({
    type: 'integer',
    comment: '评论点赞数',
    name: 'thumbs_up',
    default: 0,
  })
  thumbsUp: number;

  @Column({
    type: 'varchar',
    comment: 'ip地址',
    name: 'ip',
  })
  ip: string;
}
