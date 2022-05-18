const { Model } = require('objection')

class NutritionIngredient extends Model {
    static get tableName() {
        return 'nutrition_ingredient'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['company_id'],

            properties: {
                id: { type: 'integer' },
            },
        }
    }
}

module.exports = NutritionIngredient
