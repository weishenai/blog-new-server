import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_like' })
export class Like extends Base {
    type: number;
    for_id: number;
    user_id: number;
}