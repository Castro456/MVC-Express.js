const dbConnection = require('../database/dbConnection')

exports.usersList = async() => {
  const result = await dbConnection.query("select f_name, l_name, u_name, email, phone, created_at from users");
  return result.rows
}