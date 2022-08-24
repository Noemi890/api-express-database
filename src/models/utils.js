
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

module.exports = {
  buildWhereSQL
}