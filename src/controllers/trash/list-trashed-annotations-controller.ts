import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { listTrashedAnnotationsService } from "../../services/trash/list-trashed-annotations-service";

export async function listTrashedAnnotationsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationsOwnerSchema = z.object({
    user_id: z.string().uuid(),
  });
  const { user_id } = annotationsOwnerSchema.parse(request.headers);

  try {
    const annotations = await listTrashedAnnotationsService({ user_id });

    return reply.status(201).send(annotations);
  } catch (error) {
    return reply.status(401).send(error);
  }
}
