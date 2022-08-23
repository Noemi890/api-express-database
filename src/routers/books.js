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
  const SQLMainQuery = 'INSERT INTO books (title, type, author, topic, publicationdate, pages)  VALUES ($1, $2, $3, $4, $5, $6)'
  const params = []
  const {title, type, author, topic, publicationdate, pages} = req.body
  params.push(title, type, author, topic, publicationdate, pages)
  console.log(params)
  const queryResult = await db.query(SQLMainQuery, params)

  const bookCreated = await db.query(`SELECT * FROM books WHERE title = '${title}'`)
  res.json({
    book: bookCreated.rows
  })
})

module.exports = router
