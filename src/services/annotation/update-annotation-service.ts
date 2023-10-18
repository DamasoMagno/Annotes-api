import prisma from "../../libs/prisma";

interface IAnnotationUpdate {
  id: string;
  title?: string;
  content?: string;
  user_id: string;
}

export async function updateAnnotationService({
  id,
  title,
  content,
  user_id,
}: IAnnotationUpdate) {
  const checkAnnotation = await prisma.annotation.findFirst({
    where: {
      id,
    },
  });

  if (
    checkAnnotation?.status === "private" &&
    checkAnnotation?.user_id !== user_id
  ) {
    throw new Error("You don't have permission to update this annotation");
  }

  await prisma.annotation.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
}
