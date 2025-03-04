import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: Express = express();

var options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(options));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

export { app };
