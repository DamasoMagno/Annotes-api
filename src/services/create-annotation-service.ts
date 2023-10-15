import prisma from "../libs/prisma";

interface IAnnotation {
  title: string;
  description: string;
  status: 'public' | 'private';
  ownerId: string;
}
 
export async function createAnnotationService({ 
  title,
  description,
  ownerId,
  status 
}: IAnnotation){
  await prisma.annotation.create({
    data: {
      title,
      description,
      status,
      ownerId,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}