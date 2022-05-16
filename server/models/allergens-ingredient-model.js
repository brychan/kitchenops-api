const { Model } = require('objection')

class AllergensIngredient extends Model {
    static get tableName() {
        return 'allergens'
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

module.exports = AllergensIngredient
