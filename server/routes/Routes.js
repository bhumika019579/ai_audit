const express = require('express')
const router = express.Router()
const { createAudit, getAudit } = require('../controllers/controller')

router.post('/audit', createAudit)
router.get('/audit/:id', getAudit)

module.exports = router