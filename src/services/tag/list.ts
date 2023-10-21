import prisma from "../../libs/prisma";

interface ITag {
  user_id?: string;
}

export async function listTagsService({user_id}: ITag) {
  const tags = await prisma.tag.findMany({
    where: {
      user_id
    }
  });
  
  return tags;
}
