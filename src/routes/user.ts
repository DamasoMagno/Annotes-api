import { FastifyInstance } from "fastify";
import { z } from "zod";

import prisma from "../libs/prisma";
import { hash } from "bcryptjs";

export async function userRoute(app: FastifyInstance){
  app.post('/', async (request, reply) => {
    const userSchemaBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6, "Minimo de 6 characteres"),
    });

    const { name, email, password } = userSchemaBody.parse(request.body);
    const passwordHashed = await hash(password, 6);

    const checkUserSameEmail = await prisma.user.findFirstOrThrow({
      where: {
        email
      }
    });

    if(checkUserSameEmail){
      return reply.status(400).send("This user already exists");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed
      }
    })
    
    return reply.status(201).send({
      userId: user.id
    });
  })

  app.get("/", async (request, reply) => {
    const users = await prisma.user.findMany();
    return users
  })
}