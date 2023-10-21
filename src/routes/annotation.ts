import { FastifyInstance } from "fastify";

import { createAnnotationController } from "../controllers/annotation/create-annotation-controller";
import { updateAnnotationController } from "../controllers/annotation/update-annotation-controller";
import { updateAnnotationStatusController } from "../controllers/annotation/update-annotation-status-controller";
import { sendoAnnotationToTrashController } from "../controllers/annotation/send-annotation-to-trash-controller";
import { listAnnotationsController } from "../controllers/annotation/list-annotations-controller";

export async function annotationRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });

  app.get("/", listAnnotationsController);
  app.post("/", createAnnotationController);
  app.patch("/:annotationId", updateAnnotationController);
  app.patch("/:annotationId/status", updateAnnotationStatusController);
  app.delete("/:annotationId", sendoAnnotationToTrashController);
}
