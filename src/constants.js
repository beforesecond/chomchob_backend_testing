require('dotenv').config()

const Constants = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000,
  COLLECTION: {
    USER: 'users',
    CRYPTO: 'cryptos'
  },
  JSON_RESPONSE: {
    OK: {
      code: 200,
      message: 'Success'
    },
    CREATED: {
      code: 201,
      message: 'created'
    },
    BAD_REQUEST: {
      code: 400,
      message: 'Bad Request'
    },
    NOT_FOUND: {
      code: 404,
      message: 'Not Found'
    },
    ERROR: {
      code: 500,
      message: 'Internal Server Error'
    }
  }
}

module.exports = Constants
