import express, { json } from "express";
import Router from "./router/noteRouter.js";
import { configDotenv } from "dotenv";
import cors from "cors"

configDotenv();

const app = express();
const port = process.env.PORT_APP || 3000;

app.use(cors());
app.use(express.json());
app.use(Router);

app.listen(port, () => {
  console.log("server running on port = ", port);
});
