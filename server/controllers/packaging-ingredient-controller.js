const PackagingIngredient = require('../models/packaging-ingredient-model')

const create = async (req, res, next) => {
    const _packaging = mapToDB(req.body, req.user.company_id)
    try {
        const query = await PackagingIngredient.query().insert(_packaging)
        res.json(query)
    } catch (err) {
        return next(err)
    }
}

const getList = async (req, res, next) => {
    try {
        const query = await PackagingIngredient.query().where({
            company_id: req.user.company_id,
            deleted: false,
        })
        res.json(query)
    } catch (err) {
        return next(err)
    }
}
const getOne = async (req, res, next) => {
    const { id } = req.params
    try {
        const query = await PackagingIngredient.query().where({
            company_id: req.user.company_id,
            ingredient_id: id,
            deleted: false,
        })
        res.json(query)
    } catch (err) {
        return next(err)
    }
}
const mapToDB = (values, companyId) => {
    return {
        company_id: companyId,
        ingredient_id: 1,
        measurement_unit: values._measurementUnit,
        type:
            values._isPackage === 'Yes'
                ? 'by_package'
                : values._loose_unit === 'Unit'
                ? 'by_unit'
                : 'by_weight',
        weight_to_liter: null,
        price: parseFloat(
            values._isPackage === 'Yes'
                ? values._package_price
                : values._loose_price
        ),
        package_unit_name: values._package_name,
        package_amount_units: values._package_amount_units
            ? parseInt(values._package_amount_units)
            : null,
        package_load_per_unit: values._package_weight
            ? parseFloat(values._package_weight)
            : null,
        loose_load_per_unit: values._loose_unit_load
            ? parseFloat(values._loose_unit_load)
            : null,
    }
}

module.exports = {
    create,
    getList,
    getOne,
}
