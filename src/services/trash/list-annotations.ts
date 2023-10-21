import prisma from "../../libs/prisma";

interface IAnnotationTrash {
  user_id: string;
}

export async function listTrashedAnnotationsService({
  user_id,
}: IAnnotationTrash) {
  const annotations = await prisma.annotation.findMany({
    where: {
      user_id,
      trashed_at: {
        not: null,
      },
    },
  });

  return annotations;
}
