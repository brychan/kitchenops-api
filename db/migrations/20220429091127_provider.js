/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = (knex, Promise) => {
  return knex.schema.createTable("provider", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("company_id").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.boolean("deleted").notNullable().defaultTo(false);
    table.string("description")
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.foreign("company_id").references("id").inTable("company");

  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("provider");
};
