import { Controller,Delete,Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("/add")
  async add(){}

  @Post("/apply")
  async apply(){}

  @Put("/thumbUp/:id")
  async thumbUpComment(){}

  @Put("/cancelThumbUp/:id")
  async cancelThumbUp(){}

  @Delete("/delete/:id/:parent_id")
  async deleteComment(){}

  @Delete("/backDelete/:id/:parent_id")
  async deleteCommentByServer(){}

  @Post("/backGetCommentList")
  async backGetCommentList(){}

  @Post("/frontGetParentComment")
  async frontGetParentComment(){}

  @Post("/frontGetChildrenComment")
  async frontGetChildrenComment(){}

  @Post("/getCommentTotal")
  async getCommentTotal(){}
}
