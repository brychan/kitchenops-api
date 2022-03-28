/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("account").del();
  await knex("account").insert([
    {
      email: "test2@gmail.com",
      name: "test11",
      password: "123123",
    },
  ]);
};
