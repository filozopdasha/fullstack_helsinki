const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')
app.use(express.static(path.resolve(__dirname, 'dist')))

app.use(express.json())

const cors = require('cors')
app.use(cors())

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
]

app.get('/info', (req, res) => {
    const num = persons.length
    const curr = new Date()
    res.send(`
    <p>Phonebook has info for ${num} people</p>
    <p>${curr}</p>
  `)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find((p) => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).json({ error: 'Person not found' })
    }
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body
    if (!name || !number) {
        return res.status(400).json({ error: 'name and number are required' })
    }

    const existingName = persons.some(
        (p) => p.name.toLowerCase() === name.toLowerCase()
    )

    if (existingName) {
        return res.status(400).json({ error: 'name must be unique' })
    }
    const newPerson = {
        id: Math.floor(Math.random() * 1000000).toString(),
        name,
        number,
    }
    persons.push(newPerson)
    res.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const starterLength = persons.length
    persons = persons.filter((p) => p.id !== id)
    if (persons.length < starterLength) {
        res.status(204).end()
    } else {
        res.status(404).json({ error: 'Person not found' })
    }
})

app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})