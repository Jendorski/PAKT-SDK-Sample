import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import config from "./config";
import { initialize } from "./helper";
import api from "./routes/index";
import morganMiddleware from "./utils/morgan";

dotenv.config();

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
);

app.use(morganMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1", api);

const start = async () => {
  await initialize();
  app.listen(config.PORT, function () {
    console.log(`app running on ${config.PORT} on ${config.ENV}`);
  });
};

start();
