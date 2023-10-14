import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_comment' })
export class comment extends Base {
    parent_id: number;
    for_id: number;
    type: number;
    from_id: number;
    from_name: string;
    from_avatar: string;
    to_id: number;
    to_name: string
    to_avatar: string;
    content: string;
    thumbs_up: number;
    ip: string
}