const Ingredient = require("../models/ingredient-model");

const getList = async (req, res, next) => {
  const params = {
    filter: req.query.filter ? req.query.filter : {},
    range: req.query.range ? req.query.rage : [0,10],
    sort: req.query.sort ? req.query.sort : ["id", "ASC"]
  }
 
  try {
    const preQuery = Ingredient.query()
      .where({
        company_id: req.user.company_id,
        deleted: false,
      })
      .range(params.range[0], params.range[1])
      .orderBy(params.sort[0], params.sort[1]);
    if (params.filter.active) preQuery.where("active", true);
    const query = await preQuery;
    res.set(
      "Content-Range",
      `ingredients ${params.range[0]}-${params.range[1]}/${query.total}`
    );
    res.json(query);
  } catch (err) {
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const query = await Ingredient.query().insert({
      ...req.body,
      company_id: req.user.company_id,
    });
    res.json(query);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  req.body.active = req.user && req.user.admin && req.body.active === "true";

  try {
    const query = await Ingredient.query()
      .where({
        company_id: req.user.company_id,
        id,
      })
      .patch(req.body)
      .returning("*");
    res.json(query[0]);
  } catch (err) {
    return next(err);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query = await Ingredient.query().where({
      account_id: req.user.id,
      id,
    });
    res.json(query[0]);
  } catch (err) {
    return next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query = await Ingredient.query()
      .where({
        account_id: req.user.id,
        id,
      })
      .patch({ deleted: true });
    res.json({ delete: true });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getList,
  create,
  update,
  getOne,
  deleteOne,
};
