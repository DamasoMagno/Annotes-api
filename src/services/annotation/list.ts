import prisma from "../../libs/prisma";

interface IAnnotationTrash {
  user_id: string;
  title?: string;
  tags?: string[];
}

export async function listAnnotationsService({
  user_id,
  title,
  tags,
}: IAnnotationTrash) {
  const annotations = await prisma.annotation.findMany({
    where: {
      title: {
        contains: title,
      },
      trashed_at: null,
      user_id,
      tags: tags
        ? {
            some: {
              tag: {
                name: {
                  in: tags,
                },
              },
            },
          }
        : {},
    },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const annotationsFormatted = annotations.map((annotation) => ({
    id: annotation.id,
    title: annotation.title,
    content: annotation.content,
    status: annotation.status,
    created_at: annotation.created_at,
    updated_at: annotation.updated_at,
    ownerId: annotation.user_id,
    tags: annotation.tags.map((tagObj) => ({
      name: tagObj.tag.name,
    })),
  }));

  return annotationsFormatted;
}
