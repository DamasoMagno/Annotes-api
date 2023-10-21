import { FastifyInstance } from "fastify";

import { deleteAnnotationFromTrashController } from "../controllers/trash/delete-annotation-from-trash-controller";
import { deleteAnnotationsFromTrashController } from "../controllers/trash/delete-annotations-from-trash-controller";
import { listTrashedAnnotationsController } from "../controllers/trash//list-trashed-annotations-controller";
import { removeAnnotationsFromTrashController } from "../controllers/trash/remove-annotation-from-trash-controller";

export async function trashRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });

  app.get("/", listTrashedAnnotationsController);
  app.patch("/annotations", removeAnnotationsFromTrashController);
  app.delete("/:annotationId", deleteAnnotationFromTrashController);
  app.delete("/annotations", deleteAnnotationsFromTrashController);
}
