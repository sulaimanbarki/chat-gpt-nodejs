const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// character routes
router.post('/', characterController.createCharacter);
router.get('/', characterController.getAllCharacters);
router.get('/:id', characterController.getCharacterById);
router.put('/:id', characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);


// export whole object at once, you cannot export more object from this module
module.exports = router;