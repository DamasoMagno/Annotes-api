import prisma from "../libs/prisma";

interface IAnnotationTrash {
  ownerId: string;
  title?:  string;
}

export async function listAnnotationsService({ ownerId, title }: IAnnotationTrash){
  const annotations = await prisma.annotation.findMany({
    where: {
      title: {
        contains: title
      },
      ownerId
    },
  });

  return annotations
}