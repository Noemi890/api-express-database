const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const size = Object.keys(req.query).length
  const params = []
  let SQLbase = 'SELECT * FROM pets'

  if(size) {
    SQLbase += ' WHERE type = $1'
    params.push(req.query.type)
  }

  const qResult = await db.query(SQLbase, params)

  res.json({
    pets: qResult.rows
  })
})

router.post('/', async (req, res) => {
  let SQLmain = 'INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *'
  const valuesArray = Object.values(req.body)
  const size = valuesArray.length

  const result = await db.query(SQLmain, valuesArray)

  res.status(201).json({
    pet: result.rows
  })
  
})

router.get('/:id', async (req, res) => {
  const id = Object.values(req.params)
  const mainSQL = 'SELECT * FROM pets WHERE id = $1'

  const result = await db.query(mainSQL, id)

  res.json({
    pet: result.rows
  })
})

module.exports = router