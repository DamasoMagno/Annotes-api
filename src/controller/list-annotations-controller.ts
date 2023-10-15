import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { listAnnotationsService } from "../services/list-annotations-service";

export async function listAnnotationsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationsOwnerSchema = z.object({
    ownerid: z.string().uuid(),
  });
  const annotationsFilter = z.object({
    title: z.string().optional()
  })

  const { ownerid: ownerId } = annotationsOwnerSchema.parse(request.headers);
  const { title } = annotationsFilter.parse(request.query);

  try {
    const annotations = await listAnnotationsService({ ownerId, title });

    return reply.status(201).send(annotations);
  } catch (error) {
    return reply.status(401).send(error);
  }
}
