const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        prompt: {
            type: String,
            required: true
        },
        completion: {
            type: String,
            required: false
        },
        character_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character',
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;