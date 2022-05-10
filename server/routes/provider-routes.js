const express = require('express')
const router = express.Router()
const _authHelpers = require('../utilities/_authHelpers')

const providerController = require('../controllers/provider-controller')

router.get('/', _authHelpers.loginRequired, (req, res, next) => {
  providerController.getList(req, res, next)
})

router.post('/', _authHelpers.loginRequired, (req, res, next) => {
  providerController.create(req, res, next)
})

module.exports = router
