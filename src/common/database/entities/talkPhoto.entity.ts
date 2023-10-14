import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'blog_talk_photo' })
export class TalkPhoto extends Base{
    talk_id:number;
    url:string
}