/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item_table').del()
  await knex('item_table').insert([
    {UserId: 1, Item_Name: 'Wrench1', Description: 'Socket wrench', Quantity: 1},
    {UserId: 2, Item_Name: 'Screwdriver2', Description: 'Flathead screwdriver', Quantity: 2},
    {UserId: 3, Item_Name: 'Hammer3', Description: 'Ballpeen hammer', Quantity: 3}
  ])
};
