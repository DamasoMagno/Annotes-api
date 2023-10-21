import { FastifyInstance } from "fastify";

import { deleteAnnotationFromTrashController } from "../controllers/trash/delete-annotation";
import { deleteAnnotationsFromTrashController } from "../controllers/trash/delete-annotations-from-trash";
import { listTrashedAnnotationsController } from "../controllers/trash/list-annnotations";
import { recoverAnnotationsFromTrashController } from "../controllers/trash/recover-annotation-from-trash";

export async function trashRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });

  app.get("/", listTrashedAnnotationsController);
  app.patch("/annotations", recoverAnnotationsFromTrashController);
  app.delete("/:annotationId", deleteAnnotationFromTrashController);
  app.delete("/annotations", deleteAnnotationsFromTrashController);
}
