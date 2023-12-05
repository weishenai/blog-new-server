import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { SwaggerDocumentation } from '../../common/decorator/swagger.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { NoAuth } from '../../common';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdatePassWordDto, UpdateUserDto } from './dto/update-user.dto';

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
  @SwaggerDocumentation('分页查询用户', '返回查询信息', '', String)
  async getUserList(@Body() params: QueryUserDto) {
    return this.userService.getList(params);
  }

  @Get('/getUserById/:id')
  @SwaggerDocumentation('通过用户 id 查询信息', '返回用户信息', '', String)
  async getUserInfoById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Put('/adminUpdateUserInfo')
  @SwaggerDocumentation('管理员修改用户信息', '', '', String)
  async adminUpdateUserInfo(@Body() body: UpdateUserDto) {
    return await this.userService.adminUpdateUserInfo(body);
  }

  @Put('/updateRole/:id/:role')
  @SwaggerDocumentation('修改用户角色', 'true', 'false', Boolean)
  async updateUserRole(
    @Param('id') id: number,
    @Param('role') role: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.userService.updateRole(id, role, body);
  }

  @Put('/updatePassword')
  @SwaggerDocumentation('修改用户密码', 'true', 'false', Boolean)
  async updatePassWord(@Body() body: UpdatePassWordDto) {
    return await this.userService.updatePassWord(body);
  }

  @Put('/updateOwnUserInfo')
  @SwaggerDocumentation('修改用户信息', '', '', Boolean)
  async updateUserInfo(@Body() body: UpdateUserDto) {
    return await this.userService.updateUserInfo(body);
  }
}
