
exports.up = function(knex, Promise) {
    return knex.schema.createTable('instructions', tbl => {
        // create primary key called id
        tbl.increments();
        // name, steps, recipe_id (foreign key)
        tbl.text('steps');
        tbl.integer('recipe_id').notNullable();
    })
};

exports.down = function(knex) {
    // drop the whole table
    return knex.schema.dropTableIfExists('instructions');
};