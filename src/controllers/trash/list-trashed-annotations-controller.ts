import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { listTrashedAnnotationsService } from "../../services/trash/list-trashed-annotations-service";

interface JwtUser {
  sub: string; 
}


export async function listTrashedAnnotationsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub: user_id } = request.user as JwtUser;

  try {
    const annotations = await listTrashedAnnotationsService({ user_id });

    return reply.status(201).send(annotations);
  } catch (error) {
    return reply.status(401).send(error);
  }
}
