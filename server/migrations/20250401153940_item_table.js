/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item_table', table => {
    table.increments('Id').primary();
    table.integer('UserId').unsigned();
    table.foreign('UserId').references('Id').inTable('user_table').onDelete('CASCADE');
    table.string('Item_Name');
    table.string('Description');
    table.integer('Quantity');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('item_table');
};
