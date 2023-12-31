import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { updateAnnotationService } from "../../services/annotation/update";

interface JwtUser {
  sub: string; 
}

export async function updateAnnotationController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationSchemaBody = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional()
  });
  const annotationIdSchema = z.object({
    annotationId: z.string().uuid(),
  });

  const { annotationId } = annotationIdSchema.parse(request.params);
  const { title, content, tags } = annotationSchemaBody.parse(request.body);

  const { sub: user_id } = request.user as JwtUser;

  try {
    await updateAnnotationService({
      id: annotationId,
      title,
      content,
      user_id,
      tags
    });

    return reply.send();
  } catch (error) {
    return reply.send(error);
  }
}
