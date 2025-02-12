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

exports.checkUserCredential = async (credential, credentialType) => {
  const result = await dbConnection.query(`select ${credentialType} from users where ${credentialType} = $1`, [credential])
  return result.rows[0]
}

exports.getPasswordByUserCred = async (credential, credentialType) => {
  const result = await dbConnection.query(`select id as user_id, password from users where ${credentialType} = $1`, [credential])
  return result.rows[0]
}

exports.insertRefreshToken = async (userId, refreshToken) => {
  const result = await dbConnection.query(`update users set refresh_token = $1 where id = $2 returning id`, [refreshToken, userId])
  return result.rows[0]
}

exports.updateLastLogin = async (userId) => {
  const result = await dbConnection.query(`update users set last_login = now() where id = $1`, [userId])
}

exports.getRefreshToken = async (refreshToken) => {
  const result = await dbConnection.query(`select id as user_id from users where refresh_token = $1`, [refreshToken])
  return result.rows[0]
}

exports.updateRefreshToken = async (userId, newRefreshToken) => {
  const result = await dbConnection.query(`update users set refresh_token = $1 where id = $2 returning id`, [newRefreshToken, userId])
  return result.rows[0]
}