import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { sendAnnotationToTrashService } from "../../services/annotation/send-annotation-to-trash";

export async function sendoAnnotationToTrashController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationIdSchema = z.object({
    annotationId: z.string().uuid(),
  });

  const { annotationId } = annotationIdSchema.parse(request.params);

  try {
    await sendAnnotationToTrashService({ annotationId });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(401).send(error);
  }
}
