import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { DeletePhotoDto } from './dto/delete-photo.dto';
import { RevertPhotoDto } from './dto/update.photo.dto';
import { QueryPhotoDto } from './dto/query.photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('/add')
  async add(@Body() body: CreatePhotoDto[]) {
    return await this.photoService.add(body);
  }

  @Put('/delete')
  async delete(@Body() body: DeletePhotoDto) {
    return await this.photoService.delete(body);
  }

  @Put('/revert')
  async revert(@Body() body: RevertPhotoDto) {
    return await this.photoService.revert(body);
  }

  @Post('/getPhotoListByAlbumId')
  async getPhotoListByAlbumId(@Body() body: QueryPhotoDto) {
    return await this.photoService.getPhotosByAlbumId(body);
  }

  @Get('/getAllPhotosByAlbumId/:id')
  async getAllPhotosByAlbumId(@Param('id') id: number) {
    return await this.photoService.getAllPhotosByAlbumId(id);
  }
}
