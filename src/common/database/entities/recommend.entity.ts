import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_recommend' })
export class Recommend extends Base {
  @Column({
    name: 'title',
    comment: '推荐网站标题',
    type: 'varchar',
    length: 55,
  })
  title: string;

  @Column({
    name: 'link',
    comment: '网站地址',
    type: 'varchar',
  })
  link: string;
}
