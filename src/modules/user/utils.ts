import * as bcrypt from 'bcrypt';

// 对用户密码进行编码
export function encodePassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function comparePassWord(password1: string, password2: string) {
  return bcrypt.compareSync(password1, password2);
}
