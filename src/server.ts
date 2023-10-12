import fastify from "fastify";
const app = fastify();

import { userRoute } from "./routes/user";
import { annotationRoute } from "./routes/annotation";

app.register(annotationRoute, {
  prefix: "annotation"
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
