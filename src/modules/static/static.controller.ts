import { Controller, Post, Req } from '@nestjs/common';
import { StaticService } from './static.service';

@Controller('upload')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Post('img')
  async uploadImg(@Req() req) {
    return await this.staticService.uploadFile(req.body);
  }
}
