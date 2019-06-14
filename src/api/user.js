import { UserModel } from '../models'
import { CryptoModel } from '../models'
import { JSON_RESPONSE } from '../constants'

const register = (req, res) => {
  try {
    const { body } = req
    const user = {
      username: body.username,
      password: body.password
    }
    UserModel.CreateOne(user)
    res.status(JSON_RESPONSE.OK.code).json(JSON_RESPONSE.OK)
  } catch (e) {
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

const transfer = async (req, res) => {
  try {
    const { body } = req
    const { from, to } = body
    const cryptoFrom = {
      currency: from.currency.toUpperCase()
    }
    const cryptoTo = {
      currency: to.currency.toUpperCase()
    }
    const userFromFilter = {
      username: from.username
    }
    const userToFilter = {
      username: to.username
    }
    const cryptoFromResult = await CryptoModel.Find(cryptoFrom)
    const cryptoToResult = await CryptoModel.Find(cryptoTo)
    const fromResult = await UserModel.FindByUserName(from)
    const toResult = await UserModel.FindByUserName(to)
    const multiple = getMultiple(
      cryptoFromResult[0].rate,
      cryptoToResult[0].rate
    )
    const newFromUser = getNewFromUser(
      fromResult[0],
      from.currency.toUpperCase(),
      from.amount
    )
    let toData = toResult[0]
    if (!checkCurrency(toData, cryptoTo.currency)) {
      toData[`${cryptoTo.currency}`] = {
        amount: 0
      }
    }
    const newToUser = getNewToUser(
      toData,
      to.currency.toUpperCase(),
      from.amount * multiple
    )

    UserModel.Update(userFromFilter, newFromUser)
    UserModel.Update(userToFilter, newToUser)
    res.status(JSON_RESPONSE.OK.code).json(JSON_RESPONSE.OK)
  } catch (e) {
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

function checkCurrency(data, currency) {
  let keys = Object.keys(data)
  const result = keys.filter(items => items === currency)

  return result.length > 0 ? true : false
}

function getMultiple(currency1, currency2) {
  return currency1 / currency2
}

function getNewFromUser(data, currency, amount) {
  let newFrom = {
    ...data
  }
  newFrom[`${currency}`].amount -= amount
  return newFrom
}

function getNewToUser(data, currency, amount) {
  let newTo = {
    ...data
  }
  newTo[`${currency}`].amount += amount
  return newTo
}

export { register, transfer }
