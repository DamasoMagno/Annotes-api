import { FastifyInstance } from "fastify";

import { createUserController } from "../controller/create-user-controller";
import { listAnnotationsController } from "../controller/list-users-controller"

export async function userRoute(app: FastifyInstance){
  app.post('/', createUserController);
  app.get("/", listAnnotationsController)
}