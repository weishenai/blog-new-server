import { Body, Controller, Post } from '@nestjs/common';
import { SwaggerDocumentation } from '../../common/decorator/swagger.decorator';
import { LoginUser } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { NoAuth } from '../../common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth()
  @Post('login')
  @SwaggerDocumentation(
    '用户登陆',
    '返回登陆是否成功结果',
    'bad request例子',
    String,
  )
  async login(@Body() userInfo: LoginUser) {
    return await this.authService.login(userInfo);
  }
}
