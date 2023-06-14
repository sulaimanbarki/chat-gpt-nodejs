const Chat = require('../models/chatModel');

exports.createChat = async (req, res) => {
    try {
        const chat = await Chat.create(req);
        return chat;
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// get last 10 prompts
exports.getRecentPrompts = async (req, res) => {
    try {
        const { prompt, chat_id } = req.fields;
        const recentPrompts = await Chat.find({ chat_id: chat_id }).limit(10);
        return recentPrompts;
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// get by chat_id
exports.getChatId = async (req, res) => {
    try {
        const { user_id, character_id } = req.fields;
        const chat = await Chat.findOne({ user_id: user_id, character_id: character_id });
        return chat;
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}