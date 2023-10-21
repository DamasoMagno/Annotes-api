import prisma from "../../libs/prisma";

interface ITag {
  name: string;
}

export async function createTagService({ name }: ITag) {
  await prisma.tag.create({
    data: {
      name,
    },
  });
}
