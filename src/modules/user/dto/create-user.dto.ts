import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CreateUserDto {
  username: string;
  password: string;
  role: string;
  nick_name?: string;
  qq?: string;
  ip?: string;
  avatar?: string;
}
