import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UpdateConfigDto } from './dto/update-config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post('/update')
  async updateConfig(@Body() body: UpdateConfigDto) {
    return await this.configService.updateConfig(body);
  }

  @Put('/addView')
  async addView() {
    return await this.configService.addView();
  }

  @Get('/')
  async getConfig() {
    return await this.configService.getConfig();
  }
}
