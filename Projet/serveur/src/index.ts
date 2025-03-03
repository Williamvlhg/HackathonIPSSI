import dotenv from "dotenv";
import { Request, Response } from "express";
import { app } from "./lib/express";

import GetWorkerRouter from "./routes/get/worker";
import GetSkillRouter from "./routes/get/skill";
import GetUserRouter from "./routes/get/user";
import GetSiteRouter from "./routes/get/site";

import DeleteWorkerRouter from "./routes/delete/worker";
import DeleteSkillRouter from "./routes/delete/skill";
import DeleteUserRouter from "./routes/delete/user";
import DeleteSiteRouter from "./routes/delete/site";

import PostLoginRouter from "./routes/post/login";
import PostRegisterRouter from "./routes/post/register";
import PostSiteRouter from "./routes/post/site";

dotenv.config();

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// ROUTES GET
app.use("/worker", GetWorkerRouter);
app.use("/skill", GetSkillRouter);
app.use("/user", GetUserRouter);
app.use("/site", GetSiteRouter);

// ROUTES DELETE
app.use("/worker", DeleteWorkerRouter)
app.use("/skill", DeleteSkillRouter)
app.use("/user", DeleteUserRouter)
app.use("/site", DeleteSiteRouter)

// ROUTES POST
app.use('/login', PostLoginRouter)
app.use('/register', PostRegisterRouter)
app.use('/site', PostSiteRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
