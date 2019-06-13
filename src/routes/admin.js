var express = require('express')
var router = express.Router()
const admin = require('../api/admin')

router.post('/crypto', admin.addCrypto)
router.put('/crypto', admin.updateCrypto)
router.delete('/crypto', admin.deleteCrypto)
router.put('/userBalance', admin.updateUserBalance)
router.get('/total', admin.getTotalBalance)

module.exports = router
