import prisma from "../libs/prisma";

interface IAnnotationUpdate {
  id: string;
  title?: string;
  description?: string;
  ownerId: string;
}

export async function updateAnnotationService({ 
  id, 
  title,
  description,
  ownerId 
}: IAnnotationUpdate){
  const checkAnnotation = await prisma.annotation.findFirst({
    where: {
      id,
    },
  });

  if (
    checkAnnotation?.status === "private" &&
    checkAnnotation?.ownerId !== ownerId
    
  ) {
    throw new Error("You don't have permission to update this annotation");
  }

  await prisma.annotation.update({
    where: {
      id
    },
    data: {
      title,
      description,
    },
  });
}