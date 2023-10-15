import prisma from "../libs/prisma";

interface IAnnotationTrash {
  ownerId: string;
}

export async function removeAnnotationsFromTrashService({ ownerId }: IAnnotationTrash){
  await prisma.annotation.deleteMany({
    where: {
      ownerId
    },
  });
}