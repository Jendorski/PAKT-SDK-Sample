import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import config from "./config";
import { initialize } from "./helper";
import api from "./routes/index";
import morganMiddleware from "./utils/morgan";
import Utils from "./utils/response";

//"file:../../../Pakt/PaktSDK",,
//"^0.1.33",
const { success } = Utils;

dotenv.config();

const app = express();

declare global {
  namespace Express {
    export interface Response {
      file?: any;
      originalUrl: string;
      method: string;
      cachedResponse?: boolean;
    }

    export interface Request {
      file?: any;
    }
  }
}

//"pakt-sdk": "file:../../PaktSDK",//"^0.1.32",

app.options("*", cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
);

app.use(morganMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

app.use("/v1", api);

//app.use(api);

// Basic ? Response
app.get("/", (req: Request, res: Response) => {
  return success(
    res,
    {},
    `${config.APP_NAME} is online ${Date()} on ${req.app.get(
      "env"
    )} Environment`
  );
});

//  Not Found Response
app.use("**", (req: Request, res: Response, next: NextFunction) => {
  const err = {
    name: "Not Found",
    message: `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`,
    code: 404,
    isOperational: true,
  };
  next(err);
});

const start = async () => {
  await initialize();
  app.listen(config.PORT, function () {
    console.log(`app running on ${config.PORT} on ${config.ENV}`);
  });
};

start();
