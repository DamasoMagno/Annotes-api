import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { updateAnnotationService } from "../services/update-annotation-service";

export async function updateAnnotationController(
  request: FastifyRequest, 
  reply: FastifyReply
){
  const annotationSchemaBody = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
  });
  const annotationsOwnerSchema = z.object({
    ownerid: z.string().uuid(),
  });
  const { ownerid: ownerId } = annotationsOwnerSchema.parse(request.headers);
    
  const { id, title, description } =
    annotationSchemaBody.parse(request.body);

  try {
    await updateAnnotationService({
      id,
      title,
      description,
      ownerId
    });

    return reply.send();
  } catch (error) {
    return reply.send(error);
  }
}