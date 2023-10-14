import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({name:'blog_talk'})
export class Talk extends Base{
    user_id:number;
    content:string;
    status:number;
    is_top:number;
    like_times:number;
}