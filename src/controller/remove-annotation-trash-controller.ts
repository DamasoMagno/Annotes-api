import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { removeAnnotationTrashService } from "../services/remove-annotation-trash-service";

export async function remoteAnnotationTrashController(request: FastifyRequest, reply: FastifyReply){
  const annotationIdSchema = z.object({
    annotationId: z.string().uuid()
  })

  const { annotationId } = annotationIdSchema.parse(request.params);

  try {
    await removeAnnotationTrashService(annotationId)
  
    return reply.status(201).send()
  } catch (error) {
    return reply.status(401).send(error)
  }

}