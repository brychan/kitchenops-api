/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("category_ingredient").del();
  await knex("category_ingredient").insert([
    {
      name: 'Vegetarian',
      color: '#fbca04',
      company_id: 1,
    },
  ]);
};
