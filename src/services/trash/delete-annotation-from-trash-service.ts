import prisma from "../../libs/prisma";

interface IAnnotationTrash {
  annotationId: string;
}

export async function deleteAnnotationFromTrashService({
  annotationId,
}: IAnnotationTrash) {
  const checkAnnotationIsTrashed = await prisma.annotation.findFirst({
    where: {
      id: annotationId,
    },
  });

  if (checkAnnotationIsTrashed?.trashed_at) {
    throw new Error("This annotation removed from system");
  }

  await prisma.annotation.delete({
    where: {
      id: annotationId,
    },
  });
}
