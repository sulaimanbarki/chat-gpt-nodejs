const chatbotController = require('../controllers/chatbotController');
const router = require('express').Router();

router.post('/', chatbotController.chatApi);
router.get('/recommended-characters', chatbotController.recommendedCharacters);

module.exports = router;