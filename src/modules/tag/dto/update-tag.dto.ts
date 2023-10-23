import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends CreateTagDto {
  id: number;
}

export class CreateOrUpdateTagDto extends CreateTagDto {
  id?: number;
}
