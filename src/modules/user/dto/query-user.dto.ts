export class QueryUserDto {
  current: number;

  size: number;

  nickName: string;

  role: number;
}

export class QueryResultDto {
  username: string;
  password: string;
  role: string;
  nick_name: string;
  qq: string;
  ip: string;
  avatar: string;
  address?: string;
}

export const entityKeys = [
  'user.username',
  'user.role',
  'user.nick_name',
  'user.avatar',
  'user.createdAt',
  'user.updatedAt',
  'user.qq',
  'user.ip',
  'user.password',
  'user.id',
];

export function pick(originKeys: string[], filterKeys: string[]) {
  return originKeys.filter((key) => {
    return !filterKeys.includes(key);
  });
}
