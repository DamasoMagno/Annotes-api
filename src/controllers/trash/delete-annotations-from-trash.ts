import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { deleteAnnotationsFromTrashService } from "../../services/trash/delete-annotations";

interface JwtUser {
  sub: string; 
}


export async function deleteAnnotationsFromTrashController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub: user_id } = request.user as JwtUser;

  try {
    await deleteAnnotationsFromTrashService({ user_id });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(401).send(error);
  }
}
