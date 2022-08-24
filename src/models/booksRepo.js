const { buildWhereSQL, buildInsertSQL } = require('./utils')
const db = require("../../db");


const getAll = async (paramskey, paramsvalues) => {
  const mainSQL = 'SELECT * FROM books'
  const whereSQL = buildWhereSQL(paramskey, mainSQL)

  return (await db.query(whereSQL, paramsvalues)).rows
}

const postBook = async (params) => {
  const mainSQL = 'INSERT INTO books '
  const SQLMainQuery = buildInsertSQL(mainSQL, params)
  
  console.log(SQLMainQuery)

  return (await db.query(SQLMainQuery, Object.values(params))).rows
}

module.exports = {
  getAll,
  postBook
}