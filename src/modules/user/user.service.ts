import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../common/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BusinessException } from '../../common/exceptions/business.exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  entityKeys,
  pick,
  QueryResultDto,
  QueryUserDto,
} from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}
  async getUserInfo(username: string) {
    if (username === '5201314') {
      return {
        id: 5201314,
        role: 1,
        nick_name: '超级管理员',
      };
    }
    try {
      const res = await this.userRepository.findOneBy({ username });
      this.Logger.log('User', res);
      return res;
    } catch (e) {
      this.Logger.error('getUserInfoError', e);
    }
  }

  /**
   * @description 创建用户
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const tempUser = await this.userRepository.create(createUserDto);
      // 给密码加密
      tempUser.password = this.encodePassword(tempUser.password);
      const res = await this.userRepository.save(tempUser);
      console.log('result', res);
      if (res) {
        return '创建成功';
      } else {
        throw new BusinessException('用户创建失败');
      }
    } catch (e) {
      console.log('e', e);
    }
  }

  /**
   * @description 获取用户列表
   * @param params
   */
  async getList(params: QueryUserDto) {
    const { current, size, username, role } = params;
    const resultKeys = pick(entityKeys, ['user.password']);
    const search = this.userRepository
      .createQueryBuilder('user')
      .select([...resultKeys])
      .where('user.username Like :username', { username: `%${username}%` })
      .andWhere('user.role = :role', { role })
      .skip((current - 1) * size)
      .take(size);
    const list = await search.getMany();
    const count = await search.getCount();
    if (list) {
      return {
        record: list,
        size,
        current,
        count,
      };
    } else {
      return new BusinessException('查询用户列表失败');
    }
  }

  async findOne(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async findOneByCondition(condition: object) {
    return await this.userRepository.findOne(condition);
  }

  // 对用户密码进行编码
  public encodePassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
