const express = require("express")
const recipesDb = require("../data/models/recipes-models")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		const recipes = await recipesDb.find()
		res.json(recipes)
	} catch(err) {
		next(err)
	}
})

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

module.exports = router