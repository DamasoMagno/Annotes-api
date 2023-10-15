import prisma from "../libs/prisma";

interface IAnnotationTrash {
  ownerId: string;
}

export async function listTrashedAnnotationsService({ ownerId }: IAnnotationTrash){
  const annotations = await prisma.annotation.findMany({
    where: {
      ownerId,
      trashed_at: {
        not: null
      }
    },
  });

  return annotations
}