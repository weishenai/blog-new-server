import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TagService } from './tag.service';
import { SwaggerDocumentation } from '../../common/decorator/swagger.decorator';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { QueryTagDto } from './dto/query-tag.dto';
import { DeleteTagDto } from './dto/delete-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @SwaggerDocumentation('新增标签', '', '', String)
  @Post('/add')
  async addTag(@Body() tag: CreateTagDto) {
    return await this.tagService.addTag(tag);
  }

  @Put('/update')
  async updateTag(@Body() tag: UpdateTagDto) {
    return await this.tagService.updateTag(tag);
  }

  @Post('/delete')
  async deleteTag(@Body() tagDto: DeleteTagDto) {
    return await this.tagService.removeTag(tagDto);
  }

  @Post('/getTagList')
  async getTagList(@Body() params: QueryTagDto) {
    return await this.tagService.getTagList(params);
  }

  @Get('/getTagDictionary')
  async getTagDictionary() {}
}
