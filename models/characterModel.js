const mongoose = require('mongoose');

const characterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Character name is required"]
        },
        slug: {
            type: String,
            required: true
        },
        character_description: {
            type: String,
            required: false
        },
        type: {
            type: String,
            enum: ['paid', 'free'],
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        light_mode_icon: {
            type: String,
            required: false
        },
        dark_mode_icon: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;