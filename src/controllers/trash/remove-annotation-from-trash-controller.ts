import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { removeAnnotationFromTrashService } from "../../services/trash/remove-annotation-from-trash-service";

export async function removeAnnotationsFromTrashController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationsOwnerSchema = z.object({
    annotationId: z.string().uuid(),
  });
  const { annotationId } = annotationsOwnerSchema.parse(request.params);

  try {
    await removeAnnotationFromTrashService({ annotationId });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(401).send(error);
  }
}
