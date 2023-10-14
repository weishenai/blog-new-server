import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({name:'blog_recommend'})
export class Recommend extends Base{
    title:string;
    link:string
}