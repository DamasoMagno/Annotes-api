import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { deleteTagService } from "../../services/tag/delete-tag-service";

export async function deleteTagController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationIdSchema = z.object({
    tagId: z.string().uuid(),
  });

  const { tagId } = annotationIdSchema.parse(request.params);

  try {
    await deleteTagService({ tag_id: tagId });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(401).send(error);
  }
}
