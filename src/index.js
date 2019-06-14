const Contatns = require('./constants')
import express from 'express'
const app = express()
const port = Contatns.PORT
const routes = require('./routes/index')
const admin = require('./routes/admin')
const user = require('./routes/user')
const bodyParser = require('body-parser')
const { connectDb } = require('./databases/mongodb')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/user', routes)
app.use('/admin', admin)
app.use('/user', user)

//app.listen(port, () => console.log(`running on port ${port}!`))
connectDb().then(async () => {
  app.listen(port, () => console.log(`running on port ${port}!`))
})
