import { CreateTagDto } from './create-tag.dto';

export class QueryParamsTagDto {
  tagName?: string;
  current: number;
  size: number;
}

export class QueryTagDto extends CreateTagDto {
  id?: number;
}

export class TagDictionaryDTO {
  tagName: string;
  id: string;
}

export const entityKeys = [
  'tag.tagName',
  'tag.createdAt',
  'tag.updatedAt',
  'tag.id',
];
