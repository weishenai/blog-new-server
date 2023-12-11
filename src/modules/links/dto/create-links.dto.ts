export class CreateLinksDto {
  siteName: string;

  siteDesc: string;

  siteAvatar: string;

  url: string;

  // 友链状态 1 待审核 2 审核通过
  status?: number;
}
