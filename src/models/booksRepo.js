const { buildWhereSQL } = require('./utils')
const db = require("../../db");


const getAll = async (paramskey, paramsvalues) => {
  const mainSQL = 'SELECT * FROM books'
  const whereSQL = buildWhereSQL(paramskey, mainSQL)

  return (await db.query(whereSQL, paramsvalues)).rows
}

module.exports = {
  getAll
}