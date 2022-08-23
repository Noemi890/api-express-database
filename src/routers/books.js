const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const type = req.query.type
  let SQLMainQuery = 'SELECT * FROM books'
  const params = []

  if (type) {
    SQLMainQuery += ' WHERE type = $1'
    params.push(type)
  }

  console.log(SQLMainQuery)

  const queryResult = await db.query(SQLMainQuery, params)
  console.log('my result', queryResult)

  res.json({
    books: queryResult.rows
  })
})

router.post('/', async (req, res) => {
  
})

module.exports = router
