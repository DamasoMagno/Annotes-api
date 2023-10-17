import prisma from "../../libs/prisma";


interface IAnnotationUpdateStatus {
  id: string;
  status: 'public' | 'private';
  user_id: string;
}

export async function updateAnnotationStatusService({
  id,
  user_id,
  status
}: IAnnotationUpdateStatus){
  const annotationPrivate = await prisma.annotation.findFirst({
    where: { id },
  });

  if (annotationPrivate?.user_id !== user_id) {
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