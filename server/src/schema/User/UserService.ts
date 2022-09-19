import argon2 from 'argon2';
import prisma from '../../utils/prisma';
import { RegisterUserInput } from './UserDTO';

export const createUser = async (input: RegisterUserInput) => {
  //    hash the password
  const password = await argon2.hash(input.password);

  //   return the user
  return prisma.user.create({
    data: {
      ...input,
      email: input.email.toLowerCase(),
      username: input.username.toLowerCase(),
      //   insert the hashed password into user object
      password,
    },
  });
};
