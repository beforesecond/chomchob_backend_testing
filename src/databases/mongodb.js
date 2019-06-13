const mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient
const { DATABASE_URL } = require('../constants')

const connectDb = () => {
  return mongoose.connect(DATABASE_URL)
}

const CreateOne = (collection, data) => {
  MongoClient.connect(DATABASE_URL, function(err, db) {
    if (err) throw err
    var dbo = db.db('')
    console.log(collection, data)
    dbo.collection(collection).insertOne(data, function(err, res) {
      if (err) throw err
      console.log('1 document inserted')
      db.close()
    })
  })
}

const Find = (collection, query) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DATABASE_URL, function(err, db) {
      if (err) {
        reject(err)
      }
      var dbo = db.db('')
      dbo
        .collection(collection)
        .find(query)
        .toArray(function(err, result) {
          if (err) {
            reject(err)
          }
          resolve(result)
          db.close()
        })
    })
  })
}

const Delete = (collection, query) => {
  MongoClient.connect(DATABASE_URL, function(err, db) {
    if (err) throw err
    var dbo = db.db('')
    dbo.collection(collection).deleteOne(query, function(err, obj) {
      if (err) throw err
      console.log('1 document deleted')
      db.close()
    })
  })
}

const Update = (collection, query, newData) => {
  MongoClient.connect(DATABASE_URL, function(err, db) {
    if (err) throw err
    var dbo = db.db('')
    var newvalues = { $set: newData }
    dbo.collection(collection).updateOne(query, newvalues, function(err, res) {
      if (err) throw err
      console.log('1 document updated')
      db.close()
    })
  })
}

module.exports = { connectDb, CreateOne, Find, Delete, Update }
