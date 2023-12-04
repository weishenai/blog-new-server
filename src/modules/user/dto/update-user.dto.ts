import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: number;
  // 操作人角色信息
  operateRole?: number;
  operateUserName?: string;
}

// 修改密码
export class UpdatePassWordDto {
  id: number;
  userName: string;
  password: string;
  password1: string;
  password2: string;
}
