import { FastifyReply, FastifyRequest } from "fastify";

import { listUserService } from "../services/list-user-service";

export async function listAnnotationsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const annotations = await listUserService();

    return reply.status(201).send(annotations);
  } catch (error) {
    return reply.status(401).send(error);
  }
}
