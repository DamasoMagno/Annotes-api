import prisma from "../../libs/prisma";

interface ITag {
  user_id?: string;
}

export async function listTagsService() {
  const tags = await prisma.tag.findMany();
  return tags;
}
