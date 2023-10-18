import prisma from "../../libs/prisma";

interface IAnnotation {
  title: string;
  content: string;
  status: "public" | "private";
  user_id: string;
  tags: string[];
}

export async function createAnnotationService({
  title,
  content,
  user_id,
  status,
  tags,
}: IAnnotation) {
  const annotation = await prisma.annotation.create({
    data: {
      title,
      content,
      status,
      user_id,
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
                id: annotation.id,
              },
            },
          },
        },
      },
    });
  }
}
