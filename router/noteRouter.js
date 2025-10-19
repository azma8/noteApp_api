import express from "express";

import {
  addData,
  deleteData,
  getData,
  getDataById,
  updateData,
} from "../controller/noteController.js";

const Router = express.Router();

Router.get("/note", getData);
Router.get("/note/:id", getDataById);
Router.post("/note", addData);
Router.put("/note/:id", updateData);
Router.delete("/note/:id", deleteData);

export default Router;
