import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({name:'blog_photo'})
export class Photo extends Base {
    album_id: number;
    url: string;
    status: number;
}