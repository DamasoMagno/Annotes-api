import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { deleteAnnotationsFromTrashService } from "../../services/trash/delete-annotations-from-trash";

export async function deleteAnnotationsFromTrashController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationsOwnerSchema = z.object({
    user_id: z.string().uuid(),
  });
  const { user_id } = annotationsOwnerSchema.parse(request.headers);

  try {
    await deleteAnnotationsFromTrashService({ user_id });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(401).send(error);
  }
}
