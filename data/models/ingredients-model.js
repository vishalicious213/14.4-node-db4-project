const db = require("../dbConfig")

// GET all ingredients
function find() {
	return db("ingredients")
}

// GET ingredients by ID
function findById(id) {
    return db("ingredients")
        .join("recipes", "recipes.id", "ingredients.recipe_id")
		.where("ingredients.recipe_id", id)
		.select(
            "recipes.id",
            "recipes.name",
            "ingredients.name"
        )
}

// POST new ingredient
function add(ingredient) {
    return db("ingredients")
        .insert(ingredient)
}

// PUT / UPDATE ingredient
function update(changes, id) {
    return db("ingredients")
        .where("ingredients.id", id)
        .update(changes)
}

// DELETE ingredient by ID
function remove(id) {
    return db("ingredients")
        .where("ingredients.id", id)
        .del()
}

module.exports = {
	find,
    findById,
    add,
    update,
    remove
}