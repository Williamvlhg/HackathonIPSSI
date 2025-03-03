import dotenv from "dotenv";
import { Request, Response } from "express";
import { app } from "./lib/express";
import SiteRouter from "./routes/get/site";
import SkillRouter from "./routes/get/skill";
import UserRouter from "./routes/get/user";
import WorkerRouter from "./routes/get/worker";
import LoginRoute from "./routes/post/login";
import RegisterRoute from "./routes/post/register";

dotenv.config();

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// GET
app.use("/worker", WorkerRouter);
app.use("/skill", SkillRouter);
app.use("/user", UserRouter);
app.use("/site", SiteRouter);

// POST
app.use("/login", LoginRoute);
app.use("/register", RegisterRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
