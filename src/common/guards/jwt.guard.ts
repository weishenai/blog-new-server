import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '..';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';
import { BusinessException } from '../exceptions/business.exception';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  /**
   * 判断是否能通行
   * @param context 上下文
   * @returns 通行可否
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果是公共接口则放行
    if (isPublic) {
      // 💡 查看此条件
      return true;
    }

    // 通过Request取得在Header中的token
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // 如果不存在 token 则禁止放行
    if (!token) {
      BusinessException.throwForbidden();
    }
    try {
      // 验证token的内容
      const validate = await this.validate(token);
      if (validate) {
        // 解析token
        // 💡 我们在这里将有效载荷分配给请求对象
        // 以便我们可以在路由处理程序中访问它
        request['user'] = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('SECURITY_CONFIG').secret,
        });
      }
    } catch {
      BusinessException.throwForbidden();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // @ts-ignore
    return request.headers.authorization ?? undefined;
  }

  // 验证JWT令牌，如果JWT令牌无效则抛出禁止错误
  public async validate(token: string): Promise<boolean | never> {
    try {
      const decoded: any = this.jwtService.verify(token, {
        secret: this.configService.get('SECURITY_CONFIG').secret,
      });

      if (!decoded) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      const user = await this.validateUser(decoded);
      if (!user) {
        BusinessException.throwForbidden();
      }
      return true;
    } catch (err) {
      throw new HttpException(err.message.toUpperCase(), HttpStatus.FORBIDDEN);
    }
  }

  // 解码JWT令牌
  public async decode(token: string): Promise<any> {
    return this.jwtService.decode(token, null);
  }

  // 根据decode()中的userID验证用户
  public async validateUser(decoded: any) {
    return this.userService.findOneByCondition({
      where: { userid: decoded.userid },
    });
  }
}
