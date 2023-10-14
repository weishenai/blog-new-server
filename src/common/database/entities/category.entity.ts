import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_category' })
export class Category extends Base {
  @Column({
    name: 'category_name',
    type: 'varchar',
    length: 55,
    comment: '分类名称 唯一',
  })
  categoryName: string;
}
