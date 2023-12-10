import { Body, Controller, Get, Post } from '@nestjs/common';
import { PageHeaderService } from './page-header.service';
import { UpdatePageHeaderDto } from './dto/update-page-header.dto';
import { DeletePageHeaderDto } from './dto/delete-page-header.dto';

@Controller('page-header')
export class PageHeaderController {
  constructor(private readonly pageHeaderService: PageHeaderService) {}

  @Post('/addOrUpdate')
  async addOrUpdate(@Body() body: UpdatePageHeaderDto) {
    return await this.pageHeaderService.addOrUpdate(body);
  }

  @Post('/delete')
  async delete(@Body() body: DeletePageHeaderDto) {
    return await this.pageHeaderService.delete(body);
  }

  @Get('/getAll')
  async getAll() {
    return await this.pageHeaderService.getAll();
  }
}
