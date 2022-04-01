/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = (knex, Promise) => {
  return knex.schema.createTable("error_logs", (table) => {
    table.increments();
    table.integer("accountId");
    table.string("error");
    table.string("endpoint");
    table.string("stacktrace");
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 exports.down = (knex, Promise) => {
  return knex.schema.dropTable("error_logs");
};
