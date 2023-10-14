import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_article' })
export class Article extends Base {
    articleTitle: string;
    articleId: number;
    categoryId: number;
    articleContent: string;
    articleCover: string;
    isTop: number;
    status: number;
    type: number;
    originUrl: string;
    viewTimes: number;
    articleDescription: string;
    thumbsUpTimes: number;
    readingDuration: number
}