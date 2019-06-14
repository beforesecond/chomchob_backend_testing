import mongoose from 'mongoose'
import db from '../databases/mongodb'
import { COLLECTION } from '../constants'

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  currency: {
    type: String
  },
  rate: {
    type: Number
  }
})

const Crypto = mongoose.model(COLLECTION.CRYPTO, cryptoSchema)

const CreateOne = data => {
  db.CreateOne(COLLECTION.CRYPTO, data)
}

const Find = async data => {
  const result = await db.Find(COLLECTION.CRYPTO, data)
  return result
}

const Update = async (data, newData) => {
  const query = {
    currency: data.currency
  }
  const result = await db.Update(COLLECTION.CRYPTO, query, newData)
  return result
}

const Delete = async data => {
  const { username } = data
  const user = {
    username: username
  }
  const result = await db.Delete(COLLECTION.CRYPTO, user)
}

module.exports = {
  Crypto,
  CreateOne,
  Find,
  Update,
  Delete
}
