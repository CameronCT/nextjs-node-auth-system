import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import generateCSRF from './middlewares/generateCSRF'
import corsOptions from './middlewares/corsOptions'
import MongoSQL from './utils/MongoSQL'
import { Snowflake } from '@sapphire/snowflake'
import Config from './config'
import routes from './routes'
import path from 'path'
import passport from './passport'

dotenv.config()
console.log(process.env.MONGODB_URL)

const app = express()

if (process.env.NODE_ENV !== 'production') process.env.NODE_ENV = 'development'
if (process.env.NODE_ENV === 'production') app.set('trust proxy', '1')

// App
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(mongoSanitize())

// Express Middlewares
app.use(generateCSRF)

// Mongo
new MongoSQL(process.env.MONGODB_URL ? process.env.MONGODB_URL : null, ['accounts', 'accountLogs', 'serverLogging'])

// Passport
passport.start(app)

// Routes
routes.start(app)

// CDN for Developers
if (process.env.NODE_ENV === 'development') app.use('/', express.static(path.join(__dirname, 'public')))

// Initialize
app.listen(8080, () => console.log(`Server is running in ${process.env.NODE_ENV || 'development'} for ${Config.api.cookieUrl} on port ${8080}`))

// Snowflake
const Epoch = new Date(Config.createdDate)
const snowFlake = new Snowflake(Epoch)

// Exports
export default { snowFlake }
