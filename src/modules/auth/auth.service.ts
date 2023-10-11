import { Injectable } from '@nestjs/common';
import { LoginUser } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { BusinessException } from '../../common/exceptions/business.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // 从用户数据库取得数据，并验证密码是否正确
  private async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && this.isPasswordValid(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 验证用户密码
  private isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  async login(userInfo: LoginUser) {
    const result: any = await this.validateUser(
      userInfo.username,
      userInfo.password,
    );
    // 如果验证正确，则返回token，错误则直接抛出异常
    if (result) {
      const payload = { username: result.username, sub: result.userid };
      return {
        token: this.jwtService.sign(payload, {
          secret: this.configService.get('SECURITY_CONFIG').secret,
        }),
      };
    } else {
      BusinessException.throwForbidden();
    }
  }
}
