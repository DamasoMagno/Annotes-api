import prisma from "../../libs/prisma";

interface ITag {
  tag_id: string;
}

export async function deleteTagService({ tag_id }: ITag) {
  await prisma.tag.delete({
    where: {
      id: tag_id,
    },
  });
}
