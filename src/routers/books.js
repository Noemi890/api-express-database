const express = require('express')
const router = express.Router()
const { getAll, postBook } = require('../models/booksRepo')

router.get('/', async (req, res) => {

  const books = await getAll(Object.keys(req.query), Object.values(req.query))

  res.json({
    books
  })
})

router.post('/', async (req, res) => {

  if (Object.keys(req.body).length < 6) res.status(400).json('Missing fields')

  const book = await postBook(req.body)
  console.log(book)

  res.status(201).json({
    book
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
