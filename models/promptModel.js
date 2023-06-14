const mongoose = require('mongoose')

const promptSchema = mongoose.Schema(
    {
        prompt: {
            type: String,
            required: [true, "Prompt is required"]
        },
        completion: {
            type: String,
            required: false
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        character_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character',
            required: true
        },
        chat_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Prompt = mongoose.model('Prompt', promptSchema);
module.exports = Prompt;