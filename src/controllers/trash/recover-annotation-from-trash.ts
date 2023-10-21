import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { recoverAnnotationFromTrashService } from "../../services/trash/recover-from-trash";

export async function recoverAnnotationsFromTrashController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationsOwnerSchema = z.object({
    annotationId: z.string().uuid(),
  });
  const { annotationId } = annotationsOwnerSchema.parse(request.params);

  try {
    await recoverAnnotationFromTrashService({ annotationId });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(401).send(error);
  }
}
