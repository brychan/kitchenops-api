const NutritionIngredient = require('../models/nutrition-ingredient-model')

const getOne = async (req, res, next) => {
  const { id } = req.params
  try {
      const query = await NutritionIngredient.query().where({
          company_id: req.user.company_id,
          ingredient_id: id,
      })
      res.json(query[0])
  } catch (err) {
      return next(err)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  try {
      const query = await NutritionIngredient.query()
          .patch(req.body)
          .findById(id)
          .where({ company_id: req.user.company_id })
      res.json(query)
  } catch (err) {
      return next(err)
  }
}

module.exports = {
  getOne,
  update
}