/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex, Promise) => {
  return knex.schema.createTable("ingredient", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("account_id").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.boolean("deleted").notNullable().defaultTo(false);
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.foreign("account_id").references("id").inTable("account");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("ingredient");
};
