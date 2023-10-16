import prisma from "../libs/prisma";

interface IAnnotation {
  title: string;
  description: string;
  status: 'public' | 'private';
  ownerId: string;
  tags: string[];
}
 
export async function createAnnotationService({ 
  title,
  description,
  ownerId,
  status,
  tags
}: IAnnotation){
  const annotation = await prisma.annotation.create({
    data: {
      title,
      description,
      status,
      ownerId,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  for (const tag of tags) {
    await prisma.tag.create({
      data: {
        name: tag,
        annotations: {
          create: {
            annotation: {
              connect: {
                id: annotation.id
              }
            }
          }
        }
      }
    }) 
  }
}