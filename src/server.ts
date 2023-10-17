import fastify from "fastify";
import jwtFas from "@fastify/jwt";
const app = fastify();

import { userRoute } from "./routes/user";
import { annotationRoute } from "./routes/annotation";
import { trashRoute } from "./routes/trash";

app.register(jwtFas, {
  secret: "jwt-secret",
})
app.register(annotationRoute, {
  prefix: "annotation"
})
app.register(trashRoute, {
  prefix: "trash"
})
app.register(userRoute, {
  prefix: "user"
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running");
  });
