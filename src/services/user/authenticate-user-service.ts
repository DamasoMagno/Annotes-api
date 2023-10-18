import { compare } from "bcryptjs";

import prisma from "../../libs/prisma";

interface IUser {
  email: string;
  password: string;
}

export async function createUserService({ email, password }: IUser) {
  const checkUserSameEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!checkUserSameEmail) {
    throw new Error("Email/password incorrect");
  }

  const passwordValid = await compare(password, checkUserSameEmail.password);

  if (!passwordValid) {
    throw new Error("Email/password incorrect");
  }
}
