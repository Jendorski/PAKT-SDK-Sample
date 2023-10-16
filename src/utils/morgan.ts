import { Request } from "express";
import moment from "moment";
import morgan from "morgan";

const stream = {
  // Use the http severity
  write: (message: string) => console.warn(message),
};

morgan.token("ip", (request: Request) => request.ip);
morgan.token("timestamp", () => moment().format());
// Build the morgan middleware
const morganMiddleware = morgan(
  ":method :url :status -- :response-time ms -- :ip",
  { stream }
);

export default morganMiddleware;
