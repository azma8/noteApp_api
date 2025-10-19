import { configDotenv } from "dotenv"
configDotenv()

import mysql from "mysql2"

const connection = await mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT || 3306
})


export default connection 
