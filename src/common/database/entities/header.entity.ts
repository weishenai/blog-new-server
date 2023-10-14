import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_header' })
export class Header extends Base {
  @Column({
    name: 'bg_url',
    type: 'varchar',
    comment: '背景图',
  })
  bgUrl: string;

  @Column({
    name: 'route_name',
    type: 'varchar',
    length: 555,
    comment: '路由名称',
  })
  routeName: string;
}
