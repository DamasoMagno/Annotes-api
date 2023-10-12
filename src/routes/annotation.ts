import { FastifyInstance } from "fastify";
import { z } from "zod";

import prisma from "../libs/prisma";

export async function annotationRoute(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const annotationSchemaBody = z.object({
      title: z.string(),
      description: z.string(),
      status: z.enum(["public", "private"]),
      ownerId: z.string().uuid(),
    });

    const { title, description, status, ownerId } = annotationSchemaBody.parse(
      request.body
    );

    await prisma.annotation.create({
      data: {
        title,
        description,
        status,
        ownerId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return reply.status(201).send();
  });

  app.patch("/", async (request, reply) => {
    const annotationSchemaBody = z.object({
      id: z.string().uuid(),
      title: z.string(),
      description: z.string(),
      status: z.enum(["public", "private"]).optional(),
      ownerId: z.string().uuid(),
    });

    const { id, title, description, status, ownerId } =
      annotationSchemaBody.parse(request.body);

    const annotationPrivate = await prisma.annotation.findFirst({
      where: { id },
    });

    if (
      annotationPrivate?.ownerId !== ownerId &&
      annotationPrivate?.status === "private"
    ) {
      return reply.status(401).send({ error: "Not unauthorized!" });
    }

    await prisma.annotation.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        updated_at: new Date(),
      },
    });

    return reply.status(201).send();
  });

  app.patch("/status", async (request, reply) => {
    const annotationSchemaBody = z.object({
      id: z.string().uuid(),
      status: z.enum(["public", "private"]),
      ownerId: z.string().uuid(),
    });

    const { id, status, ownerId } = annotationSchemaBody.parse(request.body);

    const annotationPrivate = await prisma.annotation.findFirst({
      where: { id },
    });

    if (annotationPrivate?.ownerId !== ownerId) {
      return reply.status(401).send({ error: "Only annotation creator have permission to edit" });
    }

    await prisma.annotation.update({
      where: {
        id,
      },
      data: {
        status,
        updated_at: new Date(),
      },
    });

    return reply.status(201).send();
  });

  app.delete("/", async (request, reply) => {
    const annotationSchemaBody = z.object({
      id: z.string().uuid(),
    });

    const { id  } = annotationSchemaBody.parse(request.body);

    await prisma.annotation.delete({
      where: {
        id,
      },
    });

    return reply.status(201).send();
  });

  app.get("/", async (request, reply) => {
    const annotations = await prisma.annotation.findMany();
    
    return annotations;
  });
}
