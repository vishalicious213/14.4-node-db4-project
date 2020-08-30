
exports.up = function(knex, Promise) {
    return knex.schema.createTable('ingredients', tbl => {
        // create primary key called id
        tbl.increments();
        // name, recipe_id (foreign key), quantity, unit (use these last 2 for measurements)
        tbl.text('name').notNullable();
        tbl.integer('recipe_id').notNullable();
        tbl.float('quantity'); // number to pair with unit (below)
        tbl.text('unit'); // uni of measurement (gram, oz, cup, etc.)
    })
};

exports.down = function(knex) {
    // drop the whole table
    return knex.schema.dropTableIfExists('ingredients');
};