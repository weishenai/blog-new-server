import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_message' })
export class Message extends Base {
    tag: string;
    message: string;
    color: string;
    font_size: number;
    bg_color: string;
    bg_url: string;
    user_id: number;
    like_times: number;
    font_weight: number;
    nick_name: string;
}