export class CreateUserDto {
  username: string;
  password: string;
  role: number;
  nick_name?: string;
  qq?: string;
  ip?: string;
  avatar?: string;
}
