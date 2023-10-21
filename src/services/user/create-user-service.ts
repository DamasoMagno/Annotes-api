import { hash } from "bcryptjs";
import prisma from "../../libs/prisma";

interface IUser {
  name: string;
  email: string;
  password: string;
}

export async function createUserService({ name, email, password }: IUser) {
  const checkUserSameEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (checkUserSameEmail) {
    throw new Error("User already exists");
  }

  const passwordHashed = await hash(password, 6)

  await prisma.user.create({
    data: {
      email,
      name,
      password: passwordHashed,
    },
  });
}
