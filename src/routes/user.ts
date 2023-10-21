import { FastifyInstance } from "fastify";

import { createUserController } from "../controllers/user/create-user-controller";
import { listAnnotationsController } from "../controllers/user/list-users-controller";
import { authenticateController } from "../controllers/user/authenticate-user-controller";

export async function userRoute(app: FastifyInstance) {
  app.post("/", createUserController);
  app.get("/", listAnnotationsController);
  app.post("/auth", authenticateController);
}
