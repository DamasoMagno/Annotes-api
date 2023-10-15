import prisma from "../libs/prisma";

interface IAnnotationTrash {
  annotationId: string;
}

export async function sendAnnotationToTrashService({ annotationId }: IAnnotationTrash){
  const checkAnnotationIsTrashed = await prisma.annotation.findFirst({
    where: {
      id: annotationId
    }
  });

  if(checkAnnotationIsTrashed?.trashed_at){
    throw new Error("This annotation already trashed");
  }

  await prisma.annotation.update({
    where: {
      id: annotationId
    },
    data: {
      trashed_at: new Date()
    }
  });
}