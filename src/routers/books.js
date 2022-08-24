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
  res.status(201).json({
    book: bookCreated.rows
  })
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const params = []
  const SQLMainQuery = 'SELECT * FROM books WHERE id = $1'

  params.push(id)

  const queryRes = await db.query(SQLMainQuery, params)

  res.json({
    book: queryRes.rows
  })

})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const params = []
  const myObj = req.body
  const size = Object.keys(myObj).length
  Object.values(myObj).forEach(val => params.push(val))
  let SQLMainQuery = 'UPDATE books SET '

  console.log(myObj)

  Object.keys(myObj).map((key, i) => {
  SQLMainQuery += `${key} = $${i +1}`
  if(i +1 < size) SQLMainQuery += ", "
  return SQLMainQuery
  })

  SQLMainQuery += ` WHERE id = ${id}`

  const qRes = await db.query(SQLMainQuery, params)
  console.log(qRes)

  const updatedBook = await db.query(`SELECT * FROM books WHERE id = ${id}`)

  res.status(201).json({
    book: updatedBook.rows
  })


})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const params = []
  params.push(id)
  const mainSQL = 'DELETE FROM books WHERE id = $1 RETURNING *'

  const result = await db.query(mainSQL, params)
  
  res.status(200).json({
    book: result.rows
  })
})
module.exports = router
