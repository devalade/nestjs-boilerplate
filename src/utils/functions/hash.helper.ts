import * as argon2 from 'argon2';

export const hashPassword = (password: string): Promise<string> => {
  return argon2.hash(password);
};

export const verifyPassword = (
  hashPassword: string,
  plainPassword: string,
): Promise<boolean> => {
  return argon2.verify(hashPassword, plainPassword);
};
