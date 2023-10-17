import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SwaggerDocumentation } from '../../common/decorator/swagger.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { NoAuth } from '../../common';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getUserInfoById/:username')
  @SwaggerDocumentation('查询用户', '返回查询信息', '', String)
  async findOne(@Param('username') username: string) {
    return await this.userService.getUserInfo(username);
  }

  @NoAuth()
  @Post('create')
  @SwaggerDocumentation('创建用户', '返回创建结果', 'bad request例子', String)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/getUserList')
  async getUserList(@Body() params: QueryUserDto) {
    return this.userService.getList(params);
  }
}
