import { FastifyInstance } from "fastify";

import { createAnnotationController } from "../controllers/annotation/create-annotation-controller";
import { updateAnnotationController } from "../controllers/annotation/update-annotation-controller";
import { updateAnnotationStatusController } from "../controllers/annotation/update-annotation-status-controller";
import { sendoAnnotationToTrashController } from "../controllers/annotation/send-annotation-to-trash-controller";
import { listAnnotationsController } from "../controllers/annotation/list-annotations-controller";

export async function annotationRoute(app: FastifyInstance) {
  app.get("/", listAnnotationsController);
  app.post("/", createAnnotationController);
  app.patch("/", updateAnnotationController);
  app.patch("/status", updateAnnotationStatusController);
  app.delete("/:annotationId", sendoAnnotationToTrashController);
}
