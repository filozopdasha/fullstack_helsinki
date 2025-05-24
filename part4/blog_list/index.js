/*const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})*/

const app = require('./app') // твій Express-додаток
const http = require('http')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

logger.info('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
        server.listen(config.PORT, () => {
            logger.info(`Server running on port ${config.PORT}`)
        })
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })