/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = (knex, Promise) => {
  return knex.schema.createTable("ingredient_category_ingredient", (table) => {
    table.integer("ingredient_id").unsigned().notNullable();
    table.integer("category_ingredient_id").unsigned().notNullable();
    table.timestamp("joined_at").notNullable().defaultTo(knex.raw("now()"));
    table.foreign("ingredient_id").references("id").inTable("ingredient");
    table.foreign("category_ingredient_id").references("id").inTable("category_ingredient");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("ingredient_category_ingredient");
};