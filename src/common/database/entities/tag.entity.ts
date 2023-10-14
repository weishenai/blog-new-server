import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({name:'blog_tag'})
export class Tag extends Base{
    tag_name:string;
}