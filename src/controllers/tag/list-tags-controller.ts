import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { listTagsService } from "../../services/tag/list-tags-service";

interface JwtUser {
  sub: string; 
}


export async function listTagsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub: user_id } = request.user as JwtUser;

  try {
    const tags = await listTagsService();

    return reply.status(201).send(tags);
  } catch (error) {
    return reply.status(401).send(error);
  }
}
