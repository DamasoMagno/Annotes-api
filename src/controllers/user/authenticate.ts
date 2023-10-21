import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { authenticateUser } from "../../services/user/authenticate"

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchemaBody = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Minimo de 6 characteres"),
  });

  const { email, password } = authenticateSchemaBody.parse(request.body);

  try {    
    const token = await authenticateUser({
      email,
      password
    })

    return reply.status(201).send(token)
  } catch (error) {
    return reply.status(201).send();
  }

}
