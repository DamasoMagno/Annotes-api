import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { createAnnotationService } from "../../services/annotation/create";

interface JwtUser {
  sub: string;
}

export async function createAnnotationController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationSchemaBody = z.object({
    title: z.string(),
    content: z.string(),
    status: z.enum(["public", "private"]),
    tags: z.array(z.string()),
  });

  const { sub: user_id } = request.user as JwtUser;

  const { title, content, status, tags } = annotationSchemaBody.parse(
    request.body
  );

  try {
    await createAnnotationService({
      title,
      content,
      status,
      user_id,
      tags,
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(400).send();
  }
}
