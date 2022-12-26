require("dotenv");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sales_db",
  password: process.env.PASSWORD,
  port: 5432,
});

module.exports = pool;
//You are connected to database "postgres" as user "postgres" on host "localhost" (address "::1") at port "5432".
