/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("company").del();
  await knex("company").insert([
    {
      name: 'KitchenOps',
      active: true,
    },
  ]);
};
