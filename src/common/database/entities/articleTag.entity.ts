import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_article_tag' })
export class ArticleTag extends Base {
  @Column({
    name: 'article_id',
    type: 'integer',
    comment: '文章id',
  })
  articleId: number;

  @Column({
    type: 'integer',
    name: 'tag_id',
    comment: '标签id',
  })
  tag_id: number;
}
