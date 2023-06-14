const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.fields;
        const slug = name.replace(/ /g, '-').toLowerCase();
        const category = new Category({ name, slug });
        await category.save();

        res.status(200).json(category);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}