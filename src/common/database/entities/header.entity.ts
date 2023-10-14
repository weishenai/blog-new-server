import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_header' })
export class Header extends Base {
    bg_url: string;
    route_name: string
}