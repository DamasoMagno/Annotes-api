import { FastifyInstance } from "fastify";

import { createUserController } from "../controllers/user/create";
import { authenticateController } from "../controllers/user/authenticate";

export async function userRoute(app: FastifyInstance) {
  app.post("/", createUserController);
  app.post("/auth", authenticateController);
}
