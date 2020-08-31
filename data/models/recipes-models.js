const db = require("../dbConfig")

function find() {
	return db("recipes")
}

function findById(id) {
	return db("recipes")
		.where("id", id)
		.first()
}

// function findAnimals(zooID) {
// 	return db("zoos_animals as za")
// 		.join("zoos as z", "z.id", "za.zoo_id")
// 		.join("animals as a", "a.id", "za.animal_id")
// 		.join("species as s", "s.id", "a.species_id")
// 		.where("z.id", zooID)
// 		.select(
// 			"a.id",
// 			"a.name",
// 			"s.name as species_name",
// 			"za.from_date",
// 			"za.to_date",	
// 		)
// }

module.exports = {
	find,
	findById,
	// findAnimals,
}