import prisma from "../../libs/prisma";

interface ITag {
  name: string;
  user_id: string;
}

export async function createTagService({ name, user_id }: ITag) {
  await prisma.tag.create({
    data: {
      name,
      user_id
    },
  });
}
