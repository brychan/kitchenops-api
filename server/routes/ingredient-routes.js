const express = require('express')
const router = express.Router()
const _authHelpers = require('../utilities/_authHelpers')

const ingredientController = require('../controllers/ingredient-controller')
const categoryIngredientController = require('../controllers/category-ingredient-controller')
const packagingIngredientController = require('../controllers/packaging-ingredient-controller')
const allergensIngredientController = require('../controllers/allergens-ingredient-controller')
const nutritionIngredientController = require('../controllers/nutrition-ingredient-controller')

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

router.get('/nutrition/:id', _authHelpers.loginRequired, (req, res, next) => {
    nutritionIngredientController.getOne(req, res, next)
})

router.patch('/nutrition/:id', _authHelpers.loginRequired, (req, res, next) => {
    nutritionIngredientController.update(req, res, next)
})

router.get('/allergens/:id', _authHelpers.loginRequired, (req, res, next) => {
    allergensIngredientController.getOne(req, res, next)
})

router.patch('/allergens/:id', _authHelpers.loginRequired, (req, res, next) => {
    allergensIngredientController.update(req, res, next)
})

router.get('/packaging/:id', _authHelpers.loginRequired, (req, res, next) => {
    packagingIngredientController.getOne(req, res, next)
})

router.get('/packaging', _authHelpers.loginRequired, (req, res, next) => {
    packagingIngredientController.getList(req, res, next)
})

router.post('/packaging', _authHelpers.loginRequired, (req, res, next) => {
    packagingIngredientController.create(req, res, next)
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
