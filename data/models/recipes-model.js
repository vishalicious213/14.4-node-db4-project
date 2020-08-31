const db = require("../dbConfig")

// GET all recipes
function find() {
	return db("recipes")
}

// GET recipe by ID
function findById(id) {
	return db("recipes")
		.where("id", id)
		.first()
}

// POST new recipe
function add(recipe) {
    return db("recipes")
        .insert(recipe)
}

// PUT / UPDATE recipe
function update(changes, id) {
    return db("recipes")
        .where("recipes.id", id)
        .update(changes)
}

// DELETE recipe by ID
function remove(id) {
    return db("recipes")
        .where("recipes.id", id)
        .del()
}

module.exports = {
	find,
    findById,
    add,
    update,
    remove
}