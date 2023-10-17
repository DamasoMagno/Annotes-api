import { FastifyInstance } from "fastify";

import { removeAnnotationFromTrashController } from "../controllers/trash/remove-annotation-from-trash-controller";
import { removeAnnotationsFromTrashController } from "../controllers/trash//remove-annotations-from-trash-controller";
import { listTrashedAnnotationsController } from "../controllers/trash//list-trashed-annotations-controller";

export async function trashRoute(app: FastifyInstance){
  app.get("/:ownerId", listTrashedAnnotationsController);
  app.delete("/:annotationId", removeAnnotationFromTrashController);
  app.delete("/annotations", removeAnnotationsFromTrashController);
}