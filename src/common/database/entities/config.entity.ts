import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_config' })
export class Config extends Base {
  @Column({
    type: 'varchar',
    length: 55,
    comment: '博客名称',
    name: 'blog_name',
    default: '某人的博客',
  })
  blogName: string;

  @Column({
    type: 'varchar',
    comment: '博客头像',
    name: 'blog_avatar',
    default: 'https://mrzym.gitee.io/blogimg/html/rabbit.png',
  })
  blogAvatar: string;

  @Column({
    type: 'varchar',
    comment: '博客头像背景图',
    name: 'avatar_bg',
  })
  avatarBg: string;

  @Column({
    type: 'varchar',
    comment: '个人签名',
    name: 'personal_say',
  })
  personalSay: string;

  @Column({
    type: 'varchar',
    comment: '博客公告',
    name: 'blog_notice',
  })
  blogNotice: string;

  @Column({
    type: 'varchar',
    comment: 'qq链接',
    name: 'qq_link',
  })
  qqLink: string;

  @Column({
    type: 'varchar',
    comment: '微信链接',
    name: 'we_chat_link',
  })
  weChatLink: string;

  @Column({
    type: 'varchar',
    comment: 'github链接',
    name: 'github_link',
  })
  githubLink: string;

  @Column({
    type: 'varchar',
    comment: 'gitee链接',
    name: 'git_ee_link',
  })
  giteeLink: string;

  @Column({
    type: 'varchar',
    comment: 'bilibili链接',
    name: 'bilibili_link',
  })
  bilibiliLink: string;

  @Column({
    type: 'bigint',
    comment: '博客被访问的次数',
    name: 'view_time',
  })
  viewTime: number;
}
