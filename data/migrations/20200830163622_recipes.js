
exports.up = function(knex, Promise) {
    return knex.schema.createTable('recipes', tbl => {
        // create primary key called id
        tbl.increments();
        // name, description, completed
        tbl.text('name').notNullable();
        tbl.integer('ingredients');
        tbl.integer('instructions');
    })
};

exports.down = function(knex) {
    // drop the whole table
    return knex.schema.dropTableIfExists('recipes');
};