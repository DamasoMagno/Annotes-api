import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { deleteAnnotationFromTrashService } from "../../services/trash/delete-annotation-from-trash-service";

export async function deleteAnnotationFromTrashController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationIdSchema = z.object({
    annotationId: z.string().uuid(),
  });

  const { annotationId } = annotationIdSchema.parse(request.params);

  try {
    await deleteAnnotationFromTrashService({ annotationId });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(401).send(error);
  }
}
