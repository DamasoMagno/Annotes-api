import { FastifyInstance } from "fastify";

import { removeAnnotationFromTrashController } from "../controller/remove-annotation-from-trash-controller";
import { removeAnnotationsFromTrashController } from "../controller/remove-annotations-from-trash-controller";
import { listTrashedAnnotationsController } from "../controller/list-trashed-annotations-controller";

export async function trashRoute(app: FastifyInstance){
  app.get("/:ownerId", listTrashedAnnotationsController);
  app.delete("/:annotationId", removeAnnotationFromTrashController);
  app.delete("/annotations", removeAnnotationsFromTrashController);
}