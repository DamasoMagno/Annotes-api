import prisma from "../../libs/prisma";

interface IAnnotationTrash {
  annotationId: string;
}

export async function recoverAnnotationFromTrashService({
  annotationId,
}: IAnnotationTrash) {
  const checkAnnotationIsDelete = await prisma.annotation.findFirst({
    where: {
      id: annotationId,
    },
  });

  if (checkAnnotationIsDelete) {
    throw new Error("Annotation already removed from system");
  }

  await prisma.annotation.update({
    where: {
      id: annotationId,
    },
    data: {
      trashed_at: null,
    },
  });
}
