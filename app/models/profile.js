const dbConnection = require('../database/dbConnection')

exports.getProfiles = async() => {
  // Don't write tryCatch block here because libraries like pg will return promises
  const result =  await dbConnection.query("select * from profile")
  return result.rows
}