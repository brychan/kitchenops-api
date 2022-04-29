/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = (knex, Promise) => {
  return knex.schema.createTable("category_ingredient", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("company_id").notNullable();
    table.boolean("deleted").notNullable().defaultTo(false);
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.foreign("company_id").references("id").inTable("company");
    table.string("color");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("category_ingredient");
};
