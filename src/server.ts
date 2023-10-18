import fastify from "fastify";
import jwtFas from "@fastify/jwt";
import nodeCron from "node-cron";

import prisma from "./libs/prisma"
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

async function removeAnnotations(){
  const annotationsOnTrash = await prisma.annotation.findMany({
    where: {
      trashed_at: {
        not: null
      }
    }
  });

  const findAnnotationWithTrashToday = annotationsOnTrash.filter(annotation => {
    const annotationDayToTrash = new Date(annotation.trashed_at ?? 0).getDate();
    const currentDay = new Date().getDate();
    const daysLeftToDeleteAnnotationFromTrash = currentDay - annotationDayToTrash;

    return daysLeftToDeleteAnnotationFromTrash === 0
  });

  for(const annotation of findAnnotationWithTrashToday){
    try {
      await prisma.annotation.delete({
        where: {
          id: annotation.id
        }
      })

      console.log("Anotação removida")
    } catch (e) {
      console.log(e)
    }

  }
}

nodeCron.schedule('* * * * *', async () => {
  await removeAnnotations();
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running");
  });
