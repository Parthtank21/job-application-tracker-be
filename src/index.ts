import "express-async-errors";
import dotenv from "dotenv";

import app from "./app";
import logger from "./utils/logger.utils";

dotenv.config();

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    app.listen(port, () =>
      logger.info(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    logger.error(error);
  }
};

start();
