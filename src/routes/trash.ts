import { FastifyInstance } from "fastify";
import { z } from "zod";

import prisma from "../libs/prisma";

import { remoteAnnotationTrashController } from "../controller/remove-annotation-trash-controller";

export async function trashRoute(app: FastifyInstance){
  app.patch("/trash/:annotationId", remoteAnnotationTrashController)

  app.patch("/trash/annotations", async (request, reply) => {
    const userIdSchema = z.object({
      userId: z.string().uuid()
    })

    const { userId } = userIdSchema.parse(request.body);


    await prisma.annotation.deleteMany({

      where: {
        ownerId:  {
          equals: userId
        },
      }
    })

    return reply.status(201).send()
  })

  app.delete("/trash/annotation", async (request, reply) => {
    const userIdSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = userIdSchema.parse(request.body);

    await prisma.annotation.delete({
      where: {
        id
      }
    })

    return reply.status(201).send()
  })
}