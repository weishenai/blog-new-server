import { Body, Controller, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/addLike')
  async addLike(@Body() body: CreateLikeDto) {
    return await this.likeService.addLike(body);
  }

  @Post('/cancelLike')
  async cancelLike(@Body() body: CreateLikeDto) {
    return await this.likeService.cancelLike(body);
  }

  @Post('/getIsLikeByIdAndType')
  async getIsLikeByIdAndType(@Body() body: CreateLikeDto) {
    return await this.likeService.getIsLikeByIdAndType(body);
  }
}
