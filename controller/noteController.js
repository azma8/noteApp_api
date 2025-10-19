import query from "../service/noteService.js";
// import time from "../utils/DateTime.js";
const time = new Date().toISOString().slice(0, 19).replace("T", " ");
import Respone from "../utils/Respone.js";

export const getData = async (req, res) => {
  try {
    // guery untuk database
    const sql = "SELECT * FROM notes";

    // Menunggu hasil dari query
    const results = await query(sql);

    //
    const formatResult = Respone(200, "get data from database", results);

    // Mengirim hasil query sebagai response
    res.status(200).json(formatResult);
  } catch (error) {
    console.log(error.message);
  }
};

export const getDataById = async (req, res) => {
  try {
    const id = req.params.id;

    // guery untuk database
    const sql = `SELECT * FROM notes WHERE id = ${id}`;

    // Menunggu hasil dari query
    const results = await query(sql);

    // format respone api
    const formatResult = Respone(
      200,
      "get data from database with id",
      results
    );

    // Mengirim hasil query sebagai response
    res.status(200).json(formatResult);
  } catch (error) {
    console.log(error.message);
  }
};

export const addData = async (req, res) => {
  const data = await req.body.note;

  if (!data) {
    res.status(404).send("data not found");
    return;
  }

  // guery untuk database
  const sql = `INSERT INTO notes VALUES ('','${data}','${time}')`;

  // Menunggu hasil dari query
  const results = await query(sql);

  // format respone api
  const formatResult = Respone(201, "insert data to database", results);

  res.status(201).json(formatResult);
};

export const updateData = async (req, res) => {
  const data = await req.body.note;
  const id = req.params.id;

  if (!data) {
    res.status(404).send("data not found");
    return;
  }

  // guery untuk database
  const sql = `UPDATE notes SET content='${data}',created_at='${time}' WHERE id = ${id}`;

  // Menunggu hasil dari query
  const results = await query(sql);

  // format respone api
  const formatResult = Respone(
    204,
    "update data on database with id ",
    results
  );

  res.status(204).json(formatResult);
};

export const deleteData = async (req, res) => {
  const id = req.params.id;

  // guery untuk database
  const sql = `DELETE FROM notes WHERE id = '${id}'`;

  // Menunggu hasil dari query
  const results = await query(sql);

  // format respone api
  const formatResult = Respone(
    "204",
    "delete data on database with id ",
    results
  );

  res.status(200).json(formatResult);
};
