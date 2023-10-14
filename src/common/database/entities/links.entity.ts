import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_links' })
export class Links extends Base {
  @Column({
    comment: '网站名称',
    type: 'varchar',
    length: '55',
    name: 'site_name',
  })
  siteName: string;

  @Column({
    comment: '网站描述',
    type: 'varchar',
    name: 'site_desc',
  })
  siteDesc: string;

  @Column({
    comment: '网站头像',
    type: 'varchar',
    name: 'site_avatar',
  })
  siteAvatar: string;

  @Column({
    comment: '网站头像',
    type: 'varchar',
    name: 'url',
  })
  url: string;

  @Column({
    comment: '友链状态 1 待审核 2 审核通过',
    type: 'integer',
    name: 'status',
  })
  status: number;
}
