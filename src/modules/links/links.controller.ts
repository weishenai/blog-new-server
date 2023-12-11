import { Body, Controller, Post, Put } from '@nestjs/common';
import { LinksService } from './links.service';
import { UpdateLinksDto } from './dto/update-links.dto';
import { QueryLinksDto } from './dto/query-links.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('/addOrUpdate')
  async addOrUpdate(@Body() body: UpdateLinksDto) {
    return await this.linksService.addOrUpdateLinks(body);
  }

  @Put('/delete')
  async delete(@Body() idList: number[]) {
    return await this.linksService.deleteLinks(idList);
  }

  @Put('/approve')
  async approve(@Body() idList: number[]) {
    return await this.linksService.approveLinks(idList);
  }

  @Post('/getLinksList')
  async getLinksList(@Body() body: QueryLinksDto) {
    return await this.linksService.getLinksList(body);
  }
}
