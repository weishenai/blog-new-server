import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_tag' })
export class Tag extends Base {
  @Column({
    name: 'tag_name',
    comment: '标签名称 唯一',
    type: 'varchar',
    length: 55,
    unique: true,
    nullable: true,
  })
  tagName: string;
}
