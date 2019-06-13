var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  return res.send('respond with a resource')
})

//router.post('/login', user_actions.login)
//router.post('/login.json', user_actions.loginjson)

module.exports = router
