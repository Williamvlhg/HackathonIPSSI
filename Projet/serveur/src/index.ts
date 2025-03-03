import dotenv from "dotenv";
import { Request, Response } from "express";
import { app } from "./lib/express";
import OuvrierRouter from "./routes/get/ouvrier";
import cors from "cors";

dotenv.config();
app.use(cors());

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use("/ouvriers", OuvrierRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
