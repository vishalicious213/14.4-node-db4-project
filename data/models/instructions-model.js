const db = require("../dbConfig")

// GET all instructions
function find() {
	return db("instructions")
}

// GET instruction by ID
function findById(id) {
	return db("instructions")
		.where("id", id)
		.first()
}

// POST new instruction
function add(instruction) {
    return db("instructions")
        .insert(instruction)
}

// PUT / UPDATE instruction
function update(changes, id) {
    return db("instructions")
        .where("instructions.id", id)
        .update(changes)
}

// DELETE instruction by ID
function remove(id) {
    return db("instructions")
        .where("instructions.id", id)
        .del()
}

module.exports = {
	find,
    findById,
    add,
    update,
    remove
}