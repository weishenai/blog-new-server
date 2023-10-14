import { Entity } from "typeorm"
import { Base } from "./base.entity"

@Entity({ name: 'blog_category' })
export class category extends Base {
    category_name: string
}