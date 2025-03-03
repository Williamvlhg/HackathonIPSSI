import dotenv from "dotenv";
import { Request, Response } from "express";
import { app } from "./lib/express";
import WorkerRouter from "./routes/get/worker";
import SkillRouter from "./routes/get/skill";
import UserRouter from "./routes/get/user";
import SiteRouter from "./routes/get/site";
import PostLoginRoute from "./routes/post/login";
import PostRegisterRoute from "./routes/post/register";
import PostSiteRoute from "./routes/post/site";

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
app.use("/login", PostLoginRoute);
app.use("/register", PostRegisterRoute);
app.use("/site", PostSiteRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
