import fastify from "fastify";
import jwtFas from "@fastify/jwt";
import nodeCron from "node-cron";

import prisma from "./libs/prisma";
const app = fastify();

import { userRoute } from "./routes/user";
import { annotationRoute } from "./routes/annotation";
import { trashRoute } from "./routes/trash";

app.register(jwtFas, {
  secret: "jwt-secret",
});
app.register(annotationRoute, { prefix: "annotation" });
app.register(trashRoute, { prefix: "trash" });
app.register(userRoute, { prefix: "user" });

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
