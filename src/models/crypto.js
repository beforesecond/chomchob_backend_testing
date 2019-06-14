import mongoose from 'mongoose'
import * as db from '../databases/mongodb'
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
  return new Promise(async (resolve, reject) => {
    try {
      await db.CreateOne(COLLECTION.CRYPTO, data)
      resolve(true)
      return true
    } catch (e) {
      reject(e)
      return false
    }
  })
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
  const query = {
    currency: data.currency
  }
  console.log(query)
  const result = await db.Delete(COLLECTION.CRYPTO, query)
}

export { Crypto, CreateOne, Find, Update, Delete }
