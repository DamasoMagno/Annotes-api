import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { listAnnotationsService } from "../../services/annotation/list-annotations-service";

interface JwtUser {
  sub: string; 
}


export async function listAnnotationsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const annotationsFilter = z.object({
    title: z.string().optional(),
    tags: z.string().optional(),
  });  
  
  const { sub: user_id } = request.user as JwtUser;

  const { title, tags } = annotationsFilter.parse(request.query);
  const tagsFormatted = tags?.split(",");

  try {
    const annotations = await listAnnotationsService({
      user_id,
      title,
      tags: tagsFormatted,
    });

    return reply.status(201).send(annotations);
  } catch (error) {
    return reply.status(401).send(error);
  }
}
