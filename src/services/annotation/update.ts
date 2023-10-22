import prisma from "../../libs/prisma";

interface IAnnotationUpdate {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
  user_id: string;
}

export async function updateAnnotationService({
  id,
  title,
  content,
  user_id,
  tags,
}: IAnnotationUpdate) {
  const checkAnnotation = await prisma.annotation.findFirst({
    where: {
      id,
    },
  });

  if (!checkAnnotation) {
    throw new Error("Annotation not find");
  }

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

  for (const tagName of tags ?? []) {
    let tag = await prisma.tag.findFirst({
      where: {
        name: tagName,
      },
    });
  
    if (!tag) {
      const createdTag = await prisma.tag.create({
        data: {
          name: tagName,
        },
      });
      
      tag = createdTag;
    }
  
    await prisma.tagsOnAnnotation.upsert({
      where: {
        tag_id_annotation_id: {
          annotation_id: id,
          tag_id: String(tag?.id),
        },
      },
      create: {
        annotation: {
          connect: {
            id,
          },
        },
        tag: {
          connect: {
            id: String(tag?.id),
          },
        },
      },
      update: {},
    });
  }
}
