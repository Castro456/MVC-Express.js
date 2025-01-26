const { Pool } = require('pg');
const dotenv = require('dotenv');

const env = dotenv.config()

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  host: process.env.host,
  port: process.env.port
})

module.exports = {
  // passing query as an object like this because so that it can be used as:
  // query("select * from profile where id = $1", userID) and n no.of params can be passed
  query: (text, params) => pool.query(text, params)
}
