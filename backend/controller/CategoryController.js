// controllers/categoryController.js

const Category = require('../models/Category');

class CategoryController {
    // Барлық категорияларды алу
    static getAllCategories(req, res) {
        Category.getAllCategories((err, categories) => {
            if (err) {
                return res.status(500).json({ error: 'Категорияларды алу кезінде қате болды.' });
            }
            res.json(categories);
        });
    }

    // Белгілі бір категорияның өнімдерін алу
    static getProductsByCategoryId(req, res) {
        const categoryId = req.params.catId;
        Category.getProductsByCategoryId(categoryId, (err, productsByCategory) => {
            if (err) {
                return res.status(500).json({ error: 'Өнімдерді алу кезінде қате болды.' });
            }
            res.json(productsByCategory);
        });
    }
}

module.exports = CategoryController;
