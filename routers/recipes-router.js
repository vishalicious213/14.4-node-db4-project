const express = require("express")
const recipesDb = require("../data/models/recipes-model")

const router = express.Router()

// GET all recipes
router.get("/", async (req, res, next) => {
	try {
		const recipes = await recipesDb.find()
		res.json(recipes)
	} catch(err) {
		next(err)
	}
})

// GET recipe by ID
router.get("/:id", async (req, res, next) => {
	try {
		const recipe = await recipesDb.findById(req.params.id)
		if (!recipe) {
			return res.status(404).json({
				message: "Recipe not found",
			})
		}

		res.json(recipe)
	} catch(err) {
		next(err)
	}
})

// POST new recipe
router.post('/', (req, res, next) => {
	const newRecipe = req.body;

	recipesDb.add(newRecipe)
	.then(recipe => {
		res.status(201).json(recipe);
	})
	.catch (err => {
		res.status(500).json({ message: 'Failed to add new recipe' });
	});
});

// PUT / UPDATE recipe
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	recipesDb.findById(id)
	.then(recipe => {
		if (recipe) {
			recipesDb.update(changes, id)
			.then(updatedRecipe => {
			res.json(updatedRecipe);
			});
		} else {
			res.status(404).json({ message: 'Could not find recipe with given id' });
		}
	})
	.catch (err => {
		res.status(500).json({ message: 'Failed to update recipe' });
	});
});

// DELETE recipe by ID
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	recipesDb.remove(id)
	.then(deleted => {
		if (deleted) {
		res.json({ removed: deleted });
		} else {
		res.status(404).json({ message: 'Could not find recipe with given id' });
		}
	})
	.catch(err => {
		res.status(500).json({ message: 'Failed to delete recipe' });
	});
});

// GET shopping list for recipe
router.get("/:id/shoppinglist", async (req, res, next) => {
	try {
		const recipe = await recipesDb.getShoppingList(req.params.id)
		if (!recipe) {
			return res.status(404).json({
				message: "Recipe not found",
			})
		}

		res.json(recipe)
	} catch(err) {
		next(err)
	}
})

// GET instructions for recipe
router.get("/:id/instructions", async (req, res, next) => {
	try {
		const recipe = await recipesDb.getInstructions(req.params.id)
		if (!recipe) {
			return res.status(404).json({
				message: "Recipe not found",
			})
		}

		res.json(recipe)
	} catch(err) {
		next(err)
	}
})

module.exports = router