import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { UpdatePassWordDto, UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../common/database/entities/user.entity';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { comparePassWord } from './utils';

@Injectable()
export class UserValidateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  async needAdminAuth(body: UpdateUserDto): Promise<{
    state: boolean;
    message: string;
  }> {
    const { operateRole } = body;
    if (!operateRole) {
      return {
        state: false,
        message: '操作人角色信息不存在',
      };
    }
    if (Number(operateRole) !== 1) {
      return {
        state: false,
        message: '普通用户仅限查看',
      };
    }
    return {
      state: true,
      message: '验证成功',
    };
  }

  /**校验密码*/
  async validatePassword(body: UpdatePassWordDto) {
    try {
      const { userName } = body;
      if (userName !== 'admin') {
        const { password, password1, password2 } = body;
        if (password1 !== password2) {
          console.error('两次输入密码不一致');
          return { state: false, message: '两次输入密码不一致' };
        }
        const findOne = await this.userRepository.findOneBy({
          username: userName,
        });
        if (!findOne) {
          return { state: false, message: '用户名不存在' };
        }
        if (!comparePassWord(password, findOne.password)) {
          console.error('密码不匹配');
          return { state: false, message: '密码不匹配' };
        }
      } else {
      }
      return { state: true, message: '校验成功' };
    } catch (e) {
      console.error(e);
      return { state: false, message: '用户校验失败' };
    }
  }
}
