import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_links' })
export class Links extends Base {
    site_name: string;
    site_desc: string;
    site_avatar: string;
    url: string;
    status: number;
}