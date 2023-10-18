import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { updateAnnotationStatusService } from "../../services/annotation/update-annotation-status-service";

export async function updateAnnotationStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationStatusSchema = z.object({
    id: z.string().uuid(),
    status: z.enum(["public", "private"]),
  });

  const annotationsOwnerSchema = z.object({
    user_id: z.string().uuid(),
  });

  const { user_id } = annotationsOwnerSchema.parse(request.headers);

  const { id, status } = annotationStatusSchema.parse(request.body);

  try {
    await updateAnnotationStatusService({
      id,
      status,
      user_id,
    });

    return reply.send();
  } catch (error) {
    return reply.send(error);
  }
}
