const express = require('express')
const router = express.Router()
const _authHelpers = require('../utilities/_authHelpers')

const ingredientController = require('../controllers/ingredient-controller')
const categoryIngredientController = require('../controllers/category-ingredient-controller')

router.get('/', _authHelpers.loginRequired, (req, res, next) => {
    ingredientController.getList(req, res, next)
})

router.post('/', _authHelpers.loginRequired, (req, res, next) => {
    ingredientController.create(req, res, next)
})
router.get('/categories', _authHelpers.loginRequired, (req, res, next) => {
    categoryIngredientController.getList(req, res, next)
})
router.post('/categories', _authHelpers.loginRequired, (req, res, next) => {
    categoryIngredientController.create(req, res, next)
})

router.get('/:id', _authHelpers.loginRequired, (req, res, next) => {
    ingredientController.getOne(req, res, next)
})

router.put('/:id', _authHelpers.loginRequired, (req, res, next) => {
    ingredientController.update(req, res, next)
})

router.delete('/:id', _authHelpers.loginRequired, (req, res, next) => {
    ingredientController.deleteOne(req, res, next)
})

module.exports = router
