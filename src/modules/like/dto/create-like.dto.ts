export class CreateLikeDto {
  //  '点赞类型 1 文章 2 说说 3 留言 4 评论',
  type: number;

  // '点赞的id 文章id 说说id 留言id',
  forId: number;

  // 点赞用户id
  userId: number;
}
