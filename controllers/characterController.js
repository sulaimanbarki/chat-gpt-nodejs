const Character = require('../models/characterModel');
const Product = require("../models/productModel");

exports.createCharacter = async (req, res) => {
    try {
        const { name, character_description, type, category_id } = req.fields;
        const slug = name.replace(/ /g, '-').toLowerCase();
        const character = new Character({ name, slug, character_description, type, category_id });
        await character.save();

        res.status(200).json(character);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

exports.getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        res.status(200).json(character);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

exports.updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByIdAndUpdate(id, req.fields);

        if (!character) {
            return res.status(404).json({ message: "Character not found" });
        }

        const updatedCharacter = await Character.findById(id);
        res.status(200).json(updatedCharacter);
    } catch (error) {
        console.log({ message: error.message });
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByIdAndDelete(id, req.fields);

        if (!character) {
            return res.status(404).json({ message: "Character not found" });
        }

        res.status(200).json({ message: "Character deleted successfully" });
    } catch (error) {
        console.log({ message: error.message });
        res.status(500).json({ message: error.message });
    }
}