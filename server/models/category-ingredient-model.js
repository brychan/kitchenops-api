const { Model } = require('objection')

class CategoryIngredient extends Model {
    static get tableName() {
        return 'category_ingredient'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'company_id'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                company_id: { type: 'integer' },
                color: { type: ['string', 'null'] },
                deleted: { type: 'boolean' },
            },
        }
    }
}

module.exports = CategoryIngredient
