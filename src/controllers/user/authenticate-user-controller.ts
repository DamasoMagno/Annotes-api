import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

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
  } catch (error) {
    return reply.status(201).send();
  }

}
