export class QueryTagDto {
  tagName?: string;
  current: number;
  size: number;
}

export const entityKeys = [
  'tag.tag_name',
  'user.createdAt',
  'user.updatedAt',
  'user.id',
];
