import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'blog_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({
    length: 255,
    type: 'varchar',
    default: null,
    unique: true,
    nullable: false,
    comment: '账号，唯一',
  })
  username: string;

  @Column({ length: 64, nullable: false, default: null, comment: '密码' })
  password: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
    comment: '用户角色 1 管理员 2 普通用户',
  })
  role: string;

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

  @CreateDateColumn({
    name: 'createdAt',
    nullable: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updatedAt',
    nullable: true,
  })
  updatedAt: string;
}
