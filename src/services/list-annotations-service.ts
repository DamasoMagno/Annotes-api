import prisma from "../libs/prisma";

interface IAnnotationTrash {
  ownerId: string;
  title?: string;
  tags?: string[];
}

export async function listAnnotationsService({
  ownerId,
  title,
  tags
}: IAnnotationTrash) {
  const annotations = await prisma.annotation.findMany({
    where: {
      title: {
        contains: title,
      },
      ownerId,
      tags: {
          some: {
            tag: {
              name: {
                in: tags
              }
            }
          }
        }
    },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              name: true
            }
          }
        }
      },
    },
  });

  const annotationsFormatted = annotations.map((annotation) => ({
    id: annotation.id,
    title: annotation.title,
    description: annotation.description,
    status: annotation.status,
    trashed_at: annotation.trashed_at,
    created_at: annotation.created_at,
    updated_at: annotation.updated_at,
    ownerId: annotation.ownerId,
    tags: annotation.tags.map((tagObj) => ({
      name: tagObj.tag.name,
    })),
  }));

  return annotationsFormatted;
}
