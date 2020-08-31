const express = require("express")
const ingredientsDb = require("../data/models/ingredients-model")

const router = express.Router()

// GET all ingredients
router.get("/", async (req, res, next) => {
	try {
		const ingredients = await ingredientsDb.find()
		res.json(ingredients)
	} catch(err) {
		next(err)
	}
})

// GET ingredient by ID
router.get("/:id", async (req, res, next) => {
	try {
		const ingredient = await ingredientsDb.findById(req.params.id)
		if (!ingredient) {
			return res.status(404).json({
				message: "Ingredients not found",
			})
		}

		res.json(ingredient)
	} catch(err) {
		next(err)
	}
})

// POST new ingredient
router.post('/', (req, res, next) => {
	const newIngredient = req.body;

	ingredientsDb.add(newIngredient)
	.then(ingredient => {
		res.status(201).json(ingredient);
	})
	.catch (err => {
		res.status(500).json({ message: 'Failed to add new ingredient' });
	});
});

// // PUT / UPDATE instructions
// router.put('/:id', (req, res) => {
// 	const { id } = req.params;
// 	const changes = req.body;

// 	instructionsDb.findById(id)
// 	.then(instruction => {
// 		if (instruction) {
// 			instructionsDb.update(changes, id)
// 			.then(updatedInstruction => {
// 			res.json(updatedInstruction);
// 			});
// 		} else {
// 			res.status(404).json({ message: 'Could not find instructions for recipe' });
// 		}
// 	})
// 	.catch (err => {
// 		res.status(500).json({ message: 'Failed to update instructions' });
// 	});
// });

// // DELETE instructions by ID
// router.delete('/:id', (req, res) => {
// 	const { id } = req.params;

// 	instructionsDb.remove(id)
// 	.then(deleted => {
// 		if (deleted) {
// 		res.json({ removed: deleted });
// 		} else {
// 		res.status(404).json({ message: 'Could not find recipe instructions' });
// 		}
// 	})
// 	.catch(err => {
// 		res.status(500).json({ message: 'Failed to delete recipe instructions' });
// 	});
// });

module.exports = router