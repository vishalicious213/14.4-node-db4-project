const db = require("../dbConfig")

// GET all recipes (this is the same as getRecipes() from the specs)
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

// returns a list of all ingredients and quantities for a given recipe
function getShoppingList(recipe_id) {
    return db("recipes")
        .join("ingredients", "recipes.id", "ingredients.recipe_id")
        .where("recipes.id", recipe_id)
        .select(
            "recipes.id as recipe_id",
            "recipes.name as recipe",
            "ingredients.quantity as quantity",
            "ingredients.unit as unit",
            "ingredients.name as ingredient"
        )
}

// returns a list of step by step instructions for preparing a recipe
function getInstructions(recipe_id) {
    return db("recipes")
        .join("instructions", "recipes.id", "instructions.recipe_id")
        .where("recipes.id", recipe_id)
        .select(
            "recipes.id as recipe_id",
            "recipes.name as recipe",
            "instructions.steps as instructions"
        )
}

module.exports = {
	find,
    findById,
    add,
    update,
    remove,
    getShoppingList,
    getInstructions
}