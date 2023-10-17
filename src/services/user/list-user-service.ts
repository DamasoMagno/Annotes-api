import prisma from "../../libs/prisma";

export async function listUserService(){
  const annotations = await prisma.user.findMany();

  return annotations
}