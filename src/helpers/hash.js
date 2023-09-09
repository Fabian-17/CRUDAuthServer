import bcrypt from 'bcrypt';

export const hashPassword = async (text) => {
  return await bcrypt.hash(text, 10)
};