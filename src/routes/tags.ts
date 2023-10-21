import { FastifyInstance } from "fastify";

import { createTagController } from "../controllers/tag/create";
import { listTagsController } from "../controllers/tag/list";
import { deleteTagController } from "../controllers/tag/delete";

export async function tagsRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });

  app.get("/", listTagsController);
  app.post("/", createTagController );
  app.delete("/:tagId", deleteTagController);
}
