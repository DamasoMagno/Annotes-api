import { hash } from "bcryptjs";
import prisma from "../libs/prisma";

interface IUser {
  name: string;
  email: string;
  password: string;
}

export async function createUserService({ name, email, password }: IUser){
  const passwordHashed = await hash(password, 6);

  const checkUserSameEmail = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
  });

  if (checkUserSameEmail) {
    throw new Error("This user already exists");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHashed,
    },
  });
}