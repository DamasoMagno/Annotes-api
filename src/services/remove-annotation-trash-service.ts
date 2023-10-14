import prisma from "../libs/prisma";

export async function removeAnnotationTrashService(annotationId: string){

  const checkAnnotationIsTrashed = await prisma.annotation.findFirst({
    where: {
      id: annotationId
    }
  });

  if(checkAnnotationIsTrashed?.trashed){
    throw new Error("This annotation already trashed");
  }

  await prisma.annotation.update({
    where: {
      id: annotationId
    },
    data: {
      trashed: false
    }
  });
}