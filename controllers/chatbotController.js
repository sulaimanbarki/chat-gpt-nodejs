const axios = require('axios');
const Chat = require('../models/chatModel');
const Prompt = require('../models/promptModel');
const Character = require('../models/characterModel');
const Category = require('../models/categoryModel')

exports.chatApi = async (req, res) => {
    try {
        const user = req.user;
        const user_id = user._id;
        let {user_prompt, character_id} = req.fields;

        let recent_prompts = [];
        let chat_id = null;
        chat = await Chat.findOne({user_id: user_id, character_id: character_id});

        if (!chat) {
            chat = await Chat.create({
                prompt: user_prompt,
                character_id: character_id,
                user_id: user_id
            });

            chat_id = chat.id;
            recent_prompts = [];
        } else {
            chat_id = chat.id;
            recent_prompts = await Prompt.find({chat_id: chat_id}).limit(5);
        }

        let recent_formated_data = "";
        if (recent_prompts) {
            recent_prompts.forEach(p => {
                recent_formated_data += `{"prompt": "${p.prompt}", "completion": "${p.completion}"},`;
            });
        }

        const character = await Character.findById(character_id);

        let prompt = `${character.character_description}old prompts and completions.${recent_formated_data} Use old prompts and completions for memory about conversation,new Prompt: ${user_prompt}`;

        const requestData = {
            prompt,
            temperature: 0.7,
            max_tokens: 250,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };

        const config = {
            headers: {
                'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', requestData, config);

        await Prompt.create({
            prompt: user_prompt,
            completion: response.data.choices[0].text,
            user_id: user_id,
            character_id: character_id,
            chat_id: chat_id
        });

        res.status(200).json({reply: response.data.choices[0].text});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

exports.recommendedCharacters = async (req, res) => {
    try {
        const user = req.user;
        // res.send(user);
        // return;

        // get all characters with most prompts from the Prompt collection
        const prompts = await Prompt.aggregate([
            { $match: { user_id: user._id } },
            { $group: { _id: "$character_id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
                $lookup: {
                    from: "characters",
                    localField: "_id",
                    foreignField: "_id",
                    as: "character",
                },
            },
        ]);

        // for each character, make new object with character info and all prompts
        const characters = [];
        for (let i = 0; i < prompts.length; i++) {
            const character = prompts[i].character[0];
            const category = await Category.findById(character.category_id);

            const prompt = await Prompt.find({ character_id: character._id, user_id: user._id }).select('prompt completion createdAt');
            
            const newCharacter = {
                _id: character._id,
                character_name: character.name,
                character_description: character.character_description,
                character_type: character.type,
                character_category_id: character.category_id,
                character_category_name: category.name,
                chat_history: prompt
            };

            characters.push(newCharacter);
        }

        res.send(characters);
        return;
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

exports.recentlyContactedCharacters = async (req, res) => {
    try {
        const user = req.user;

        const prompts = await Prompt.aggregate([
            { $match: { user_id: user._id } },
            { $sort: { createdAt: -1 } }, // Sort by createdAt field in descending order
            { $group: { _id: "$character_id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
                $lookup: {
                    from: "characters",
                    localField: "_id",
                    foreignField: "_id",
                    as: "character",
                },
            },
        ]);
        const characters = [];
        for(let i = 0; i < prompts.length; i++){
            const character = prompts[i].character[0];
            const category = await Category.findById(character.category_id);

            const prompt = await Prompt.find({ character_id: character._id, user_id: user._id }).select('prompt completion createdAt');

            const newCharacter = {
                _id: character._id,
                character_name: character.name,
                character_description: character.character_description,
                character_type: character.type,
                character_category_id: character.category_id,
                character_category_name: category.name,
                chat_history: prompt
            };

            characters.push(newCharacter);
        }

        res.send(characters);
        return;

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

exports.categoriesList = async (req, res) => {
    try {
        res.send(await Category.find().select(['slug','name']));
        return;
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}