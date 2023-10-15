import prisma from "../libs/prisma";


interface IAnnotationUpdateStatus {
  id: string;
  status: 'public' | 'private';
  ownerId: string;
}

export async function updateAnnotationStatusService({
  id,
  ownerId,
  status
}: IAnnotationUpdateStatus){
  const annotationPrivate = await prisma.annotation.findFirst({
    where: { id },
  });

  if (annotationPrivate?.ownerId !== ownerId) {
    throw new Error("You don't have permission to change this status");
  }

  await prisma.annotation.update({
    where: {
      id,
    },
    data: {
      status,
      updated_at: new Date(),
    },
  });
}