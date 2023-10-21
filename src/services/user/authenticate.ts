import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../../libs/prisma";

interface IUser {
  email: string;
  password: string;
}

export async function authenticateUser({ email, password }: IUser) {

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

  const token = jwt.sign({}, 'my-secret-key',  {
    expiresIn: '10m',
    subject: checkUserSameEmail.id
  });

  return token;
}
