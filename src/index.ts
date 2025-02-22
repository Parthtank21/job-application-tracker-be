import cors from "cors";
import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ message: "Application is running" });
});

app.listen(3001, () => {
  console.log("App is running on port 3001");
});
