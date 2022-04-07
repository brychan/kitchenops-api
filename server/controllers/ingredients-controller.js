const Ingredient = require("../models/ingredient-model");

const getList = async (req, res, next) => {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const range = req.query.range ? JSON.parse(req.query.range) : [0, 10];
  const sort = req.query.sort ? JSON.parse(req.query.sort) : ["id", "ASC"];
  try {
    console.log(req.user.id);
    const preQuery = Ingredient.query()
      .where({
        account_id: req.user.id,
        deleted: false,
      })
      .range(range[0], range[1])
      .orderBy(sort[0], sort[1]);
    if (filter.active) preQuery.where("active", true);
    const query = await preQuery;
    res.set(
      "Content-Range",
      `ingredients ${range[0]}-${range[1]}/${query.total}`
    );
    res.json(query.results);
  } catch (err) {
    return next(err);
  }
};

const create = async (req, res, next) => {
  console.log(req.body);
  try {
    const query = await Ingredient.query().insert({
      ...req.body,
      account_id: req.user.id,
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
        account_id: req.user.id,
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
