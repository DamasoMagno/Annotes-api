import { FastifyInstance } from "fastify";

import { createAnnotationController } from "../controllers/annotation/create";
import { updateAnnotationController } from "../controllers/annotation/update";
import { updateAnnotationStatusController } from "../controllers/annotation/update-status";
import { sendoAnnotationToTrashController } from "../controllers/annotation/send-to-trash";
import { listAnnotationsController } from "../controllers/annotation/list";

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
