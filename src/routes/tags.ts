import { FastifyInstance } from "fastify";

import { createTagController } from "../controllers/tag/create-tag-controller";
import { listTagsController } from "../controllers/tag/list-tags-controller";
import { deleteTagController } from "../controllers/tag/delete-tag-controller";

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
