export class QueryPhotoDto {
  size: number;
  current: number;
  id: number;
  status: number;
}

export const entityKeys = [
  'photo.id',
  'photo.createdAt',
  'photo.updatedAt',
  'photo.album_id',
  'photo.url',
  'photo.status',
];
