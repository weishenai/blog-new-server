import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_config' })
export class Config extends Base {
    blog_name: string;
    blog_avatar: string;
    avatar_bg: string;
    personal_say: string;
    blog_notice: string;
    qq_link: string;
    we_chat_link: string;
    github_link: string
    gitee_link: string;
    bilibili_link: string;
    view_time: number;
}