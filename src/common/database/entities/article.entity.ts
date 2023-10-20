import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_article' })
export class Article extends Base {
  @Column({
    name: 'article_title',
    type: 'varchar',
    comment: '文章标题 不能为空',
  })
  articleTitle: string;

  @Column({
    name: 'author_id',
    default: 1,
    nullable: true,
    type: 'int',
    comment: '文章作者 不能为空',
  })
  articleId: number;

  @Column({
    name: 'category_id',
    type: 'integer',
    nullable: true,
    comment: '分类id 不能为空',
  })
  categoryId: number;

  @Column({
    name: 'article_content',
    type: 'text',
    comment: '文章内容',
  })
  articleContent: string;

  @Column({
    type: 'varchar',
    name: 'article_cover',
    comment: '文章缩略图',
    default: 'https://mrzym.gitee.io/blogimg/html/rabbit.png',
  })
  articleCover: string;

  @Column({
    name: 'is_top',
    type: 'integer',
    default: 2,
    comment: '是否置顶 1 置顶 2 取消置顶',
  })
  isTop: number;

  @Column({
    type: 'integer',
    default: 1,
    comment: '文章状态  1 公开 2 私密 3 草稿箱',
  })
  status: number;

  @Column({
    name: 'type',
    type: 'integer',
    default: 1,
    comment: '文章类型 1 原创 2 转载 3 翻译',
  })
  type: number;

  @Column({
    name: 'origin_url',
    type: 'varchar',
    comment: '原文链接 是转载或翻译的情况下提供',
  })
  originUrl: string;

  @Column({
    type: 'integer',
    default: 0,
    comment: '文章访问次数',
  })
  viewTimes: number;

  @Column({
    name: 'article_description',
    type: 'varchar',
    comment: '描述信息 不能为空',
  })
  articleDescription: string;

  @Column({
    name: 'thumbs_up_times',
    type: 'integer',
    default: 0,
    comment: '文章点赞次数',
  })
  thumbsUpTimes: number;

  @Column({
    name: 'reading_duration',
    type: 'double',
    default: 0,
    comment: '文章阅读时长',
  })
  readingDuration: number;
}
