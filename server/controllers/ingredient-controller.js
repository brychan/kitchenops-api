const Ingredient = require('../models/ingredient-model')

const getList = async (req, res, next) => {
    const params = {
        filter: req.query.filter ? req.query.filter : {},
        range: req.query.range ? req.query.rage : [0, 10],
        sort: req.query.sort ? req.query.sort : ['id', 'ASC'],
    }

    try {
        const preQuery = Ingredient.query()
            .where({
                company_id: req.user.company_id,
                deleted: false,
            })
            .withGraphFetched('[categories, provider]')
            .range(params.range[0], params.range[1])
            .orderBy(params.sort[0], params.sort[1])
        if (params.filter.active) preQuery.where('active', true)
        const query = await preQuery
        res.set(
            'Content-Range',
            `ingredients ${params.range[0]}-${params.range[1]}/${query.total}`
        )
        res.json(query)
    } catch (err) {
        return next(err)
    }
}

const create = async (req, res, next) => {
    // For security, rewrite company_id's of Categories
    const categories = req.body.categories.map((category) => {
        return {
            id: category.id,
            company_id: req.user.company_id,
        }
    })
    try {
        const query = await Ingredient.query().upsertGraph(
            {
                ...req.body,
                company_id: req.user.company_id,
                allergens: {
                    company_id: req.user.company_id
                },
                categories,
            },
            {
                relate: true,
                noDelete: true,
            }
        )
        res.json(query)
    } catch (err) {
        return next(err)
    }
}

const update = async (req, res, next) => {
    const { id } = req.params
    req.body.active = req.user && req.user.admin && req.body.active === 'true'

    try {
        const query = await Ingredient.query()
            .where({
                company_id: req.user.company_id,
                id,
            })
            .patch(req.body)
            .returning('*')
        res.json(query[0])
    } catch (err) {
        return next(err)
    }
}

const getOne = async (req, res, next) => {
    const { id } = req.params
    try {
        const query = await Ingredient.query().where({
            company_id: req.user.company_id,
            id,
        })
        res.json(query[0])
    } catch (err) {
        return next(err)
    }
}

const deleteOne = async (req, res, next) => {
    const { id } = req.params
    try {
        const query = await Ingredient.query()
            .where({
                company_id: req.user.company_id,
                id,
            })
            .patch({ deleted: true })
        res.json({ delete: true })
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getList,
    create,
    update,
    getOne,
    deleteOne,
}
