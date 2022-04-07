/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("account").del();
  await knex("account").insert([
    {
      email: "test11",
      company_name: "KitchenOps",
      password: "$2b$10$SjcpRuVtBiNuc/duJIHHnOZpoEPq5M6DbUD8/jyrTNjtkz3BeAfSq",
      active: true,
      active_hash: null,
    },
  ]);
};
