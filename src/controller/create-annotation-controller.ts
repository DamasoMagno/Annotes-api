import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { createAnnotationService } from "../services/create-annotation-service";

export async function createAnnotationController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationSchemaBody = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["public", "private"]),
  });

  const annotationsOwnerSchema = z.object({
    ownerid: z.string().uuid(),
  });
  const { ownerid: ownerId } = annotationsOwnerSchema.parse(request.headers);

  const { title, description, status } = annotationSchemaBody.parse(
    request.body
  );

  try {
    await createAnnotationService({
      title,
      description,
      status,
      ownerId,
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(400).send();
  }
}
