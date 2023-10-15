import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { removeAnnotationsFromTrashService } from "../services/remove-annotations-from-trash";

export async function removeAnnotationsFromTrashController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationsOwnerSchema = z.object({
    ownerid: z.string().uuid(),
  });
  const { ownerid: ownerId } = annotationsOwnerSchema.parse(request.headers);

  try {
    await removeAnnotationsFromTrashService({ ownerId });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(401).send(error);
  }
}
