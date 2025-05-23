import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import Person from './models/person.js'

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())

const staticPath = path.resolve(__dirname, 'dist')
app.use(express.static(staticPath))

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    },
]

app.get('/info', (req, res, next) => {
    Person.countDocuments({})
        .then(count => {
            res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({ error: 'Please, indicate name and number, its important' })
    }

    const person = new Person(
        {
        name,
        number,
    }
    )

    person.save()
        .then(savedPerson => res.status(201).json(savedPerson))
        .catch(error => next(error))
}
)

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            if (result)
            {
                res.status(204).end()
            } else {
                res.status(404).json({ error: 'Person not found' })
            }
        }
        )
        .catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})



const errorChecker = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorChecker)
/*
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})
*/


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})