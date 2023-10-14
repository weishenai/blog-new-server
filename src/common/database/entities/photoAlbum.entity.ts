import { Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({name:'blog_photo+_album'})
export class PhotoAlbum extends Base{
    album_name:string;
    description:string;
    album_cover:string
}