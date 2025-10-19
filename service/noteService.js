import connection from "../config/Database.js";

// Membuat fungsi query berbasis Promise
const query = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export default query;
