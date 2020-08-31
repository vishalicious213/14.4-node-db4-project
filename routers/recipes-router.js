const express = require("express")
const recipesDb = require("../data/models/recipes-models")

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

module.exports = router