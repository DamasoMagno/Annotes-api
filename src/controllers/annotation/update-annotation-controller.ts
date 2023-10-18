import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { updateAnnotationService } from "../../services/annotation/update-annotation-service";

export async function updateAnnotationController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationSchemaBody = z.object({
    id: z.string().uuid(),
    title: z.string(),
    content: z.string(),
  });
  
  const annotationsOwnerSchema = z.object({
    user_id: z.string().uuid(),
  });

  const { user_id } = annotationsOwnerSchema.parse(request.headers);

  const { id, title, content } = annotationSchemaBody.parse(request.body);

  try {
    await updateAnnotationService({
      id,
      title,
      content,
      user_id,
    });

    return reply.send();
  } catch (error) {
    return reply.send(error);
  }
}
