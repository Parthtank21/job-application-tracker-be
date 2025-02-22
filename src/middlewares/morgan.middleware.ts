import morgan from "morgan";
import logger from "../utils/logger.utils";

const morganFormat =
  ":method :url :status :response-time ms - :res[content-length]";

const morganMiddleware = morgan("dev", {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});

export default morganMiddleware;
