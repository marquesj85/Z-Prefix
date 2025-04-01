/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_table').del()
  await knex('user_table').insert([
    {First_Name: 'Faker1', Last_Name: 'Manager1', Username: 'faker1', Password: 'manager1'},
    {First_Name: 'Faker2', Last_Name: 'Manager2', Username: 'faker2', Password: 'manager2'},
    {First_Name: 'Faker3', Last_Name: 'Manager3', Username: 'faker3', Password: 'manager3'},
  ]);
};
