import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { QueryNotifyDto } from './dto/query-notify.dto';
import { CreateNotifyDto } from './dto/create-notify.dto';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Put('/update/:id')
  async updateNotify(@Param('id') id: number) {
    return await this.notifyService.updateNotify(id);
  }

  @Put('/delete/:id')
  async deleteNotify(@Param('id') id: number) {
    return await this.notifyService.deleteNotifys(id);
  }

  @Post('/getNotifyList')
  async getNotifyList(@Body() body: QueryNotifyDto) {
    return await this.notifyService.getNotifyList(body);
  }

  // @Post('/add')
  // async add(@Body() body: CreateNotifyDto) {
  //   return await this.notifyService.addNotify(body);
  // }
}
