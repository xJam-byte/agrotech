import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { log } from "console";

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/",
  });
  await app.listen(PORT, () => {
    log("Service started on port " + PORT);
  });
}

start();
