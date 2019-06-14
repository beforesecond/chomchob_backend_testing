import mongoose from 'mongoose'
import * as db from '../databases/mongodb'
import { COLLECTION } from '../constants'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
})

const User = mongoose.model(COLLECTION.USER, userSchema)

const CreateOne = data => {
  db.CreateOne(COLLECTION.USER, data)
}

const FindByUserName = async data => {
  const { username } = data
  const user = {
    username: username
  }
  const result = await db.Find(COLLECTION.USER, user)
  return result
}

const Find = async data => {
  const result = await db.Find(COLLECTION.USER, data)
  return result
}

const Update = async (data, newData) => {
  const query = {
    username: data.username
  }
  const result = await db.Update(COLLECTION.USER, query, newData)
  return result
}

const Delete = async data => {
  const { username } = data
  const user = {
    username: username
  }
  const result = await db.Delete(COLLECTION.USER, user)
}

export { User, CreateOne, Find, FindByUserName, Update, Delete }
