import Contatns from './constants'
import express from 'express'
const app = express()
const port = Contatns.PORT
import routes from './routes/index'
import admin from './routes/admin'
import user from './routes/user'
import bodyParser from 'body-parser'
import { connectDb } from './databases/mongodb'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/user', routes)
app.use('/admin', admin)
app.use('/user', user)

//app.listen(port, () => console.log(`running on port ${port}!`))
connectDb().then(async () => {
  app.listen(port, () => console.log(`running on port ${port}!`))
})

export default app
