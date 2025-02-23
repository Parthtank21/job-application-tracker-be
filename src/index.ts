import "express-async-errors";
import 'dotenv/config'

import app from "./app";
import logger from "./utils/logger.utils";
import connectDb from "./utils/db.utils";

const port = process.env.PORT || 3001;
const dbUri = process.env.MONGO_URI as string;

const start = async () => {
  try {
    await connectDb(dbUri);
    app.listen(port, () =>
      logger.info(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    logger.error(error);
  }
};

start();
