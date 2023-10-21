import fastify from "fastify";
import auth from "@fastify/jwt";
import nodeCron from "node-cron";
const app = fastify();

import prisma from "./libs/prisma";

import { userRoute } from "./routes/user";
import { annotationRoute } from "./routes/annotation";
import { trashRoute } from "./routes/trash";
import { tagsRoute } from "./routes/tags";


app.register(auth, {
  secret: 'my-secret-key'
});

app.register(annotationRoute, { prefix: "annotation" });
app.register(trashRoute, { prefix: "trash" });
app.register(userRoute, { prefix: "user" });
app.register(tagsRoute, { prefix: "tag" });

async function removeAnnotations() {
  try {
    const today = new Date();

    await prisma.annotation.deleteMany({
      where: {
        trashed_at: {
          not: null,
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          lt: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
          ),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

nodeCron.schedule('0 0 * * *', async () => {
  await removeAnnotations();
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running");
  });
