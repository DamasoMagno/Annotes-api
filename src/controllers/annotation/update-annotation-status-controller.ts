import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { updateAnnotationStatusService } from "../../services/annotation/update-annotation-status-service";

interface JwtUser {
  sub: string;
}

export async function updateAnnotationStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {  
  const annotationIdSchema = z.object({
    annotationId: z.string().uuid(),
  });

  const { annotationId } = annotationIdSchema.parse(request.params);

  const { sub: user_id } = request.user as JwtUser;


  try {
    await updateAnnotationStatusService({
      id: annotationId,
      user_id,
    });

    return reply.send();
  } catch (error) {
    return reply.send(error);
  }
}
