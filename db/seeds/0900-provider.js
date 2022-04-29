/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("provider").del();
  await knex("provider").insert([
    {
      name: "ICA KVANTUM",
      company_id: 1,
      description: "Provider for everyone",
    },
  ]);
};
