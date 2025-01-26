const dbConnection = require('../database/dbConnection')

const getProfiles = async() => {
  // Don't write tryCatch block here or else cant process the error
  const result =  await dbConnection.query("select * from profile")
  return result.rows
}

module.exports = {
  getProfiles
}