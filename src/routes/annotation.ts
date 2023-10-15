import { FastifyInstance } from "fastify";

import { createAnnotationController } from "../controller/create-annotation-controller";
import { updateAnnotationController } from "../controller/update-annotation-controller";
import { updateAnnotationStatusController } from "../controller/update-annotation-status-controller";
import { sendoAnnotationToTrashController } from "../controller/send-annotation-to-trash-controller";
import { listAnnotationsController } from "../controller/list-annotations-controller";

export async function annotationRoute(app: FastifyInstance) {
  app.get("/", listAnnotationsController);
  app.post("/", createAnnotationController);
  app.patch("/", updateAnnotationController);
  app.patch("/status", updateAnnotationStatusController);
  app.delete("/:annotationId", sendoAnnotationToTrashController);
}
