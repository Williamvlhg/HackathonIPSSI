import dotenv from "dotenv";
import { Request, Response } from "express";
import { app } from "./lib/express";
import OuvrierRouter from "./routes/get/worker";
import LoginRoute from "./routes/post/login";
import RegisterRoute from "./routes/post/register";

dotenv.config();

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// GET
app.use("/ouvriers", OuvrierRouter);

// POST
app.use("/login", LoginRoute);
app.use("/register", RegisterRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
