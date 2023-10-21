import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { createTagService } from "../../services/tag/create";

interface JwtUser {
  sub: string;
}

export async function createTagController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tagSchemaBody = z.object({
    name: z.string(),
  });

  const { sub: user_id } = request.user as JwtUser;

  const { name } = tagSchemaBody.parse(request.body);

  try {
    await createTagService({
      name,
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(400).send();
  }
}
