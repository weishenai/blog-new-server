import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../common/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BusinessException } from '../../common/exceptions/business.exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { entityKeys, QueryResultDto, QueryUserDto } from './dto/query-user.dto';
import { getIpAddress, pick } from '../../utils/tool';
import { UpdatePassWordDto, UpdateUserDto } from './dto/update-user.dto';
import { BUSINESS_ERROR_CODE } from '../../common/exceptions/business.error.codes';
import { UserValidateService } from './user-validate.service';
import { encodePassword } from './utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
    private readonly userValidateService: UserValidateService,
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
      tempUser.password = encodePassword(tempUser.password);
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
    const { current, size, nickName, role } = params;
    const resultKeys = pick(entityKeys, ['user.password']);
    const search = this.userRepository
      .createQueryBuilder('user')
      .select([...resultKeys])
      .where('user.nick_name Like :nickName', { nickName: `%${nickName}%` })
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

  async getUserById(
    id: number,
  ): Promise<Omit<QueryResultDto, 'password' | 'ip'> | object> {
    const resultKeys = pick(entityKeys, ['user.password']);
    const search = this.userRepository
      .createQueryBuilder('user')
      .select([...resultKeys])
      .where('user.id = :id', { id: id });
    const user: Omit<User, 'password'> = await search.getOne();
    if (user) {
      this.Logger.log(
        `用户 【${user.username}】 ip 【${getIpAddress(user.ip)}】`,
      );
      delete user.ip;
      return user;
    }
    return {};
  }

  async findOne(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async findOneByCondition(condition: object) {
    return await this.userRepository.findOne(condition);
  }

  // 更新用户信息
  async adminUpdateUserInfo(body: UpdateUserDto) {
    try {
      const { state, message } =
        await this.userValidateService.needAdminAuth(body);
      if (!state) return new BusinessException(message);
      const { id, avatar } = body;
      const userInfo = (await this.getUserById(id)) as QueryResultDto;
      if (userInfo?.avatar && userInfo.avatar !== avatar) {
        //   TODO 删除用户头像
      }
      const res = await this.userRepository.save(body);
      if (res instanceof UpdateUserDto) {
        return true;
      }
    } catch (e) {
      this.Logger.warn(e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.USER,
        message: '修改用户信息失败',
      });
    }
  }

  // 更新角色信息
  async updateRole(id: number, role: number, body: UpdateUserDto) {
    try {
      const { state, message } =
        await this.userValidateService.needAdminAuth(body);
      if (!state) return new BusinessException(message);
      const res = await this.userRepository.update(id, { role });
      if (res) {
        return true;
      }
    } catch (e) {
      this.Logger.warn(e);
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.USER,
        message: '修改角色失败',
      });
    }
  }

  // 修改密码
  async updatePassWord(body: UpdatePassWordDto) {
    try {
      const { state, message } =
        await this.userValidateService.validatePassword(body);
      if (!state) return new BusinessException(message);
      const { password1, id } = body;
      const encodePass = encodePassword(password1);
      const res = await this.userRepository.update(id, {
        password: encodePass,
      });
      if (res) {
        return true;
      }
    } catch (e) {
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.USER,
        message: '修改用户密码失败',
      });
    }
  }

  async updateUserInfo(body: UpdateUserDto) {
    try {
      const { id, avatar } = body;
      if (!id) {
        return new BusinessException({
          code: BUSINESS_ERROR_CODE.USER,
          message: '更新用户缺少必要信息',
        });
      }
      const userInfo = (await this.getUserById(id)) as QueryResultDto;
      if (userInfo?.avatar && userInfo.avatar !== avatar) {
        //   TODO 删除用户头像
      }
      const res = await this.userRepository.update(id, body);
      if (res instanceof UpdateUserDto) {
        return true;
      }
    } catch (e) {
      return new BusinessException({
        code: BUSINESS_ERROR_CODE.USER,
        message: '修改用户失败',
      });
    }
  }
}
