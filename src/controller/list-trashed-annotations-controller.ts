import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { listTrashedAnnotationsService } from "../services/list-trashed-annotations-service";

export async function listTrashedAnnotationsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationsOwnerSchema = z.object({
    ownerid: z.string().uuid(),
  });
  const { ownerid: ownerId } = annotationsOwnerSchema.parse(request.headers);

  try {
    const annotations = await listTrashedAnnotationsService({ ownerId });

    return reply.status(201).send(annotations);
  } catch (error) {
    return reply.status(401).send(error);
  }
}
