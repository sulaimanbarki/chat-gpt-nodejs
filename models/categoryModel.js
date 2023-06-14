const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"]
        },
        slug: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;