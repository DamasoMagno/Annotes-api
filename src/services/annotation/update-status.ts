import prisma from "../../libs/prisma";

interface IAnnotationStatus {
  id: string;
  user_id: string;
}

export async function updateAnnotationStatusService({
  id,
  user_id,
}: IAnnotationStatus) {
  const annotationPrivate = await prisma.annotation.findFirst({
    where: { id },
  });

  if(!annotationPrivate) {
    throw new Error("Annotation not find")
  }

  if (annotationPrivate?.user_id !== user_id) {
    throw new Error("You don't have permission to change this status");
  }

  const updateStatus =
    annotationPrivate.status === "public" ? "private" : "public";

  await prisma.annotation.update({
    where: {
      id,
    },
    data: {
      status: updateStatus,
      updated_at: new Date(),
    },
  });
}
