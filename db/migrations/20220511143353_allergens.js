/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = (knex, Promise) => {
  return knex.schema.createTable('allergens', (table) => {
      table.increments()
      table.integer('company_id').notNullable()
      table.integer('ingredient_id').notNullable()
      table.boolean('deleted').defaultTo(false)
      table.boolean('gluten')
      table.boolean('celery')
      table.boolean('crustaceans')
      table.boolean('egg')
      table.boolean('fish')
      table.boolean('lupins')
      table.boolean('milk')
      table.boolean('nuts')
      table.boolean('peanuts') 
      table.boolean('sesame')
      table.boolean('soy')
      table.boolean('sulfur_dioxid')
      table.string('comments')
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.foreign('company_id').references('id').inTable('company')
      table.foreign('ingredient_id').references('id').inTable('ingredient')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('allergens')
}
