const dbConnection = require('../database/dbConnection')

exports.usersList = async() => {
  const result = await dbConnection.query("select f_name, l_name, u_name, email, phone, created_at from users");
  return result.rows
}

exports.getUserName = async (userName) => {
  const result = await dbConnection.query("select user_name from users where user_name = $1", [userName])
  return result.rows[0]
}