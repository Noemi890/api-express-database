
const buildWhereSQL = (params, mainSQL) => {

  console.log(params, params.length)
  if(params.length) {

    mainSQL += ' WHERE'

    params.map((key, i) => {
      mainSQL += ` ${key} = $${i+1}`
      if (i + 1 < params.length) SQLMainQuery += ' AND'
    })
  }

  return mainSQL
}

const buildInsertSQL = (SQL, params) => {
  const keys = Object.keys(params)
  const values = Object.values(params)
  let col = '('
  let val = ' VALUES ('
  keys.forEach((key, i) => {
    col += `${key}`
    val += `$${i+1}`

    i+1 < keys.length ? col += ', ' : col += ')'
    i+1 < values.length ? val += ', ' : val += ') RETURNING *'

  })
  
  return SQL + col + val
}

module.exports = {
  buildWhereSQL,
  buildInsertSQL
}