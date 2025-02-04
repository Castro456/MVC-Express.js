const dbConnection = require('../database/dbConnection')

exports.usersList = async() => {
  const result = await dbConnection.query("select f_name, l_name, u_name, email, phone, created_at from users");
  return result.rows
}

exports.checkUserName = async (userName) => {
  const result = await dbConnection.query("select u_name from users where u_name = $1", [userName])
  return result.rows[0] || {} // prevents undefined
}

exports.checkUserEmail = async (email) => {
  const result = await dbConnection.query("select email from users where email = $1", [email])
  return result.rows[0] || {}
}

exports.checkUserPhone = async (phone) => {
  const result = await dbConnection.query("select phone from users where phone = $1", [phone])
  return result.rows[0] || {}
}

exports.createUser = async (firstName, lastName, userName, email, phone, hashedPassword) => {
  const result = await dbConnection.query("insert into users (f_name, l_name, u_name, email, phone, password) values ($1, $2, $3, $4, $5, $6) returning id", [firstName, lastName, userName, email, phone, hashedPassword])
  return result.rows[0] || {}
}