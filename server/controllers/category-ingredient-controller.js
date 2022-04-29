const CategoryIngredient = require("../models/category-ingredient-model");

const getList = async (req, res, next) => {
  try {
    console.log(req.user.company_id)
    const query = await CategoryIngredient.query()
      .where({
        company_id: req.user.company_id,
        deleted: false,
      })
      .range(0,100)
    res.json(query);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getList,
};
