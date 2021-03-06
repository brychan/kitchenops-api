const Provider = require('../models/provider-model')

const getList = async (req, res, next) => {
    try {
        const query = await Provider.query()
            .where({
                company_id: req.user.company_id,
                deleted: false,
            })
            .range(0, 100)
        res.json(query)
    } catch (err) {
        return next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const query = await Provider.query().insert({
            ...req.body,
            company_id: req.user.company_id,
        })
        res.json(query)
    } catch (err) {
        return next(err)
    }
}
module.exports = {
    getList,
    create,
}
