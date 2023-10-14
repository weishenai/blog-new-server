import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_article_tag' })
export class ArticleTag extends Base {
    article_id: number;
    tag_id: number
}