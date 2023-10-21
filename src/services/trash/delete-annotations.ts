import prisma from "../../libs/prisma";

interface IAnnotationTrash {
  user_id: string;
}

export async function deleteAnnotationsFromTrashService({
  user_id,
}: IAnnotationTrash) {
  await prisma.tagsOnAnnotation.deleteMany({
    where: {
      annotation: {
        user_id
      },
    }
  })

  await prisma.annotation.deleteMany({
    where: {
      user_id
    }
  })
}
