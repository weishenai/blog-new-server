import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PhotoAlbumService } from './photo-album.service';
import { CreatePhoneAlbumDto } from './dto/create-phoneAlbum.dto';
import { UpdatePhoneAlbumDto } from './dto/update-phoneAlbum.dto';
import { QueryPhoneAlbumDto } from './dto/query-phoneAlbum.dto';

@Controller('photo-album')
export class PhotoAlbumController {
  constructor(private readonly photoAlbumService: PhotoAlbumService) {}

  @Post('/add')
  async add(@Body() body: CreatePhoneAlbumDto) {
    return await this.photoAlbumService.addPhotoAlbum(body);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.photoAlbumService.deletePhoneAlbum(id);
  }

  @Put('/update')
  async update(@Body() body: UpdatePhoneAlbumDto) {
    return await this.photoAlbumService.updatePhoneAlbum(body);
  }

  @Post('/')
  async getList(@Body() body: QueryPhoneAlbumDto) {
    return await this.photoAlbumService.getPhotoAlbum(body);
  }

  @Get('/getAllAlbumList')
  async getListAll() {
    return await this.photoAlbumService.getPhotoAlbumList();
  }
}
