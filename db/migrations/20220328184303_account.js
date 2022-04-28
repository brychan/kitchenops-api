/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex, Promise) => {
  return knex.schema.createTable("account", (table) => {
    table.increments();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.boolean("admin").notNullable().defaultTo(false);
    table.boolean("active").notNullable().defaultTo(false);
    table.integer("company_id").notNullable();
    table.string("active_hash");
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("account");
};
