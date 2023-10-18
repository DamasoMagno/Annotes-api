import prisma from "../../libs/prisma";

interface IAnnotationTrash {
  user_id: string;
}

export async function deleteAnnotationsFromTrashService({
  user_id,
}: IAnnotationTrash) {
  await prisma.annotation.deleteMany({
    where: {
      user_id,
    },
  });
}
