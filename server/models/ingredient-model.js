const { Model } = require('objection')

class Ingredient extends Model {
    static get tableName() {
        return 'ingredient'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'company_id'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                company_id: { type: 'integer' },
                provider_id: { type: ['integer', 'null'] },
                code_provider: { type: ['string', 'null'] },
                code_internal: { type: ['string', 'null'] },
                brand: { type: ['string', 'null'] },
                description: { type: ['string', 'null'] },
                active: { type: 'boolean' },
                deleted: { type: 'boolean' },
            },
        }
    }

    static get relationMappings() {
        const CategoryIngredient = require('./category-ingredient-model')
        const Provider = require('./provider-model')
        return {
            categories: {
                relation: Model.ManyToManyRelation,
                modelClass: CategoryIngredient,
                join: {
                    from: 'ingredient.id',
                    through: {
                        from: 'ingredient_category_ingredient.ingredient_id',
                        to: 'ingredient_category_ingredient.category_ingredient_id',
                    },
                    to: 'category_ingredient.id',
                },
            },
            provider: {
              relation: Model.BelongsToOneRelation,
              modelClass: Provider,
              join: {
                from: 'ingredient.provider_id',
                to: 'provider.id'
              }
            }
        }
    }
}

module.exports = Ingredient
