/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("company", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("active").notNullable().defaultTo(false);
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("company");
};
