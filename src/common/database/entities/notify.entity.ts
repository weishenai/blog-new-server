import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_notify' })
export class Notify extends Base {
    message: string;
    user_id: number;
    type: number;
    to_id: number;
    isView: number;
}