import express from 'express'
import admin from '../api/admin'
let router = express.Router()

router.post('/crypto', admin.addCrypto)
router.put('/crypto', admin.updateCrypto)
router.delete('/crypto', admin.deleteCrypto)
router.put('/userBalance', admin.updateUserBalance)
router.get('/total', admin.getTotalBalance)

export default router
