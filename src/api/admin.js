const { CryptoModel } = require('../models')
const { UserModel } = require('../models')
const { JSON_RESPONSE } = require('../constants')

const addCrypto = (req, res) => {
  try {
    const { body } = req
    const crypto = {
      name: body.name,
      currency: body.currency.toUpperCase(),
      rate: body.rate
    }
    CryptoModel.CreateOne(crypto)
    res.status(JSON_RESPONSE.OK.code).json(JSON_RESPONSE.OK)
  } catch (e) {
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

const updateCrypto = (req, res) => {
  try {
    const { body } = req
    const crypto = {
      currency: body.currency.toUpperCase(),
      rate: body.rate
    }
    CryptoModel.Update(crypto, crypto)
    res.status(JSON_RESPONSE.OK.code).json(JSON_RESPONSE.OK)
  } catch (e) {
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

const deleteCrypto = (req, res) => {
  try {
    const { body } = req
    const crypto = {
      currency: body.currency.toUpperCase()
    }
    CryptoModel.Delete(crypto)
    res.status(JSON_RESPONSE.OK.code).json(JSON_RESPONSE.OK)
  } catch (e) {
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

const updateUserBalance = async (req, res) => {
  try {
    const { body } = req
    const cryptoFilter = {
      currency: body.currency.toUpperCase()
    }
    const userFilter = {
      username: body.username
    }

    const currencyResult = await CryptoModel.Find(cryptoFilter)
    let userResult = await UserModel.Find(userFilter)
    let newUserData = {
      ...userResult[0]
    }

    newUserData[`${currencyResult[0].currency}`] = {
      amount: Number(body.amount)
    }
    UserModel.Update(userFilter, newUserData)
    res.status(JSON_RESPONSE.OK.code).json(JSON_RESPONSE.OK)
  } catch (e) {
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

const getTotalBalance = async (req, res) => {
  try {
    const cryptoFilter = null
    const userFilter = null
    let currencyResult = await CryptoModel.Find(cryptoFilter)
    const userResult = await UserModel.Find(userFilter)
    currencyResult.map(items => {
      items.total = 0
    })
    userResult.map(items => {
      key = Object.keys(items)
      key.map(keys => {
        if (keys !== 'username' && keys !== 'password' && keys !== '_id') {
          currencyResult.map(currency => {
            if (currency.currency === keys) {
              currency.total += items[`${keys}`].amount || 0
            }
          })
        }
      })
    })
    res
      .status(JSON_RESPONSE.OK.code)
      .json({ ...JSON_RESPONSE.OK, data: currencyResult })
  } catch (e) {
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

module.exports = {
  addCrypto,
  updateCrypto,
  deleteCrypto,
  updateUserBalance,
  getTotalBalance
}
