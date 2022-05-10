/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex, Promise) => {
    return knex.schema.createTable('packaging_ingredient', (table) => {
        table.increments()
        table.integer('company_id').notNullable()
        table.integer('ingredient_id').notNullable()
        table.boolean('deleted').notNullable().defaultTo(false)
        table.string('type').notNullable()
        table.string('measurement_unit').notNullable()
        table.float('weight_to_liter')
        table.decimal('price').notNullable()
        table.string('package_unit_name')
        table.integer('package_amount_units')
        table.float('package_load_per_unit')
        table.float('loose_load_per_unit')
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
        table.foreign('company_id').references('id').inTable('company')
        table.foreign('ingredient_id').references('id').inTable('ingredient')
    })
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('packaging_ingredient')
}
