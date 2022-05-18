/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = (knex, Promise) => {
  return knex.schema.createTable('nutrition_ingredient', (table) => {
      table.increments()
      table.integer('company_id').notNullable()
      table.integer('ingredient_id').notNullable()
      table.float('calories')
      table.float('protein')
      table.float('carbs')
      table.float('carbs_fiber')
      table.float('carbs_sugar')
      table.float('fats')
      table.float('fats_sat')
      table.float('fats_trans')
      table.float('fats_poly')
      table.float('fats_mono')
      table.float('sodium')
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.foreign('company_id').references('id').inTable('company')
      table.foreign('ingredient_id').references('id').inTable('ingredient')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('nutrition_ingredient')
}
