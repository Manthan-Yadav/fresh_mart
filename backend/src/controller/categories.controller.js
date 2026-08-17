const Category = require('../model/categories');

async function CreateCategory(req, res) {
    try {
        const { name, image } = req.body;

        if (!name || !image) {
            return res.status(400).json({ message: 'Name and image are required' });
        }

        const category = await Category.create({ name, image });
        return res.status(201).json({ message: 'Category created successfully', category });

    }catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

async function GetAllCategories(req, res) {
    try {
        const categories = await Category.find();
        return res.status(200).json({ categories });

    }
    catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = {
    CreateCategory,
    GetAllCategories
}