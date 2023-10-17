import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'blog_user' })
export class User extends Base {
  @Column({
    length: 255,
    type: 'varchar',
    unique: true,
    comment: '账号，唯一',
  })
  username: string;

  @Column({ length: 64, comment: '密码' })
  password: string;

  @Column({
    type: 'integer',
    nullable: false,
    default: 1,
    comment: '用户角色 1 管理员 2 普通用户',
  })
  role: number;

  @Column({ nullable: true, default: '', comment: '用户昵称' })
  nick_name: string;

  @Column({
    nullable: true,
    default: '',
    comment: '用户QQ 用于联系',
  })
  qq: string;

  @Column({
    nullable: true,
    default: '',
    comment: 'ip属地',
  })
  ip: string;

  @Column({
    nullable: true,
    default: '',
    comment: '用户头像',
  })
  avatar: string;
}
