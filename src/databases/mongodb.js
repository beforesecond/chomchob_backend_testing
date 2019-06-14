import mongoose from 'mongoose'
const MongoClient = require('mongodb').MongoClient
import { DATABASE_URL } from '../constants'

const connectDb = () => {
  return mongoose.connect(DATABASE_URL)
}

const CreateOne = (collection, data) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DATABASE_URL, function(err, db) {
      if (err) {
        reject(err)
        return
      }
      var dbo = db.db('')
      dbo.collection(collection).insertOne(data, function(err, res) {
        if (err) {
          reject(err)
          return
        }
        console.log('1 document created')
        db.close()
        resolve(true)
      })
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
  return new Promise((resolve, reject) => {
    MongoClient.connect(DATABASE_URL, function(err, db) {
      if (err) reject(err)
      var dbo = db.db('')
      dbo.collection(collection).deleteOne(query, function(err, obj) {
        if (err) reject(err)
        console.log('1 document deleted')
        db.close()
        resolve(result)
      })
    })
  })
}

const Update = (collection, query, newData) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DATABASE_URL, function(err, db) {
      if (err) reject(err)
      var dbo = db.db('')
      var newvalues = { $set: newData }
      dbo
        .collection(collection)
        .updateOne(query, newvalues, function(err, res) {
          if (err) reject(err)
          console.log('1 document updated')
          db.close()
          resolve(true)
        })
    })
  })
}

module.exports = { connectDb, CreateOne, Find, Delete, Update }
