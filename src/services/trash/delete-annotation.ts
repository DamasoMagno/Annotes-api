import prisma from "../../libs/prisma";

interface IAnnotationTrash {
  annotationId: string;
}

export async function deleteAnnotationFromTrashService({
  annotationId,
}: IAnnotationTrash) {
  await prisma.tagsOnAnnotation.deleteMany({
    where: {
      annotation_id: annotationId
    },
  }); 

  await prisma.annotation.delete({
    where: {
      id: annotationId
    }
  })
}
