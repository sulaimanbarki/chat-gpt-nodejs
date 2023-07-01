const chatbotController = require('../controllers/chatbotController');
const router = require('express').Router();

router.post('/', chatbotController.chatApi);
router.get('/recommended-characters', chatbotController.recommendedCharacters);
router.get('/recently-contacted-characters', chatbotController.recentlyContactedCharacters);
router.get('/categories-list', chatbotController.categoriesList);

module.exports = router;