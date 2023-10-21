import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { createUserService } from "../../services/user/create";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Minimo de 6 characteres"),
  });

  const { name, email, password } = userSchemaBody.parse(request.body);

  try {    
    await createUserService({
      email,
      name,
      password
    })

    return reply.status(201).send();
  } catch (error) {
    return reply.status(201).send(error);
  }

}
