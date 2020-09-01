const express = require("express")
const instructionsDb = require("../data/models/instructions-model")

const router = express.Router()

// GET all instructions
router.get("/", async (req, res, next) => {
	try {
		const instructions = await instructionsDb.find()
		res.json(instructions)
	} catch(err) {
		next(err)
	}
})

// GET instruction by ID
router.get("/:id", async (req, res, next) => {
	try {
		const instruction = await instructionsDb.findById(req.params.id)
		if (!instruction) {
			return res.status(404).json({
				message: "Instructions not found",
			})
		}

		res.json(instruction)
	} catch(err) {
		next(err)
	}
})

// POST new instructions
router.post('/', (req, res, next) => {
	const newInstruction = req.body;

	instructionsDb.add(newInstruction)
	.then(instruction => {
		res.status(201).json(instruction);
	})
	.catch (err => {
		res.status(500).json({ message: 'Failed to add new instructions' });
	});
});

// PUT / UPDATE instructions
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	instructionsDb.findById(id)
	.then(instruction => {
		if (instruction) {
			instructionsDb.update(changes, id)
			.then(updatedInstruction => {
			res.json(updatedInstruction);
			});
		} else {
			res.status(404).json({ message: 'Could not find instructions for recipe' });
		}
	})
	.catch (err => {
		res.status(500).json({ message: 'Failed to update instructions' });
	});
});

// DELETE instructions by ID
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	instructionsDb.remove(id)
	.then(deleted => {
		if (deleted) {
		res.json({ removed: deleted });
		} else {
		res.status(404).json({ message: 'Could not find recipe instructions' });
		}
	})
	.catch(err => {
		res.status(500).json({ message: 'Failed to delete recipe instructions' });
	});
});

module.exports = router