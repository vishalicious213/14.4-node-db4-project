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
            "ingredients.id as ingredient_id",
            "ingredients.name as ingredient",
            "recipes.id as recipe_id",
            "recipes.name as recipe"
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