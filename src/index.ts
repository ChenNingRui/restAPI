import express from "express";
import "dotenv/config";
import router from "./routes";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware";
import { connectDb } from "./db";

connectDb();
const app = express();

const port = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use("/", router());
app.use(errorHandler);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
