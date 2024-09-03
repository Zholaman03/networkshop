
const db = require('../config/db');

class Category {
 
    // Барлық категорияларды алу әдісі
    static getAllCategories(callback) {
        const query = 'SELECT * FROM categories';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
          
            callback(null, results);
        });
    }

    // Белгілі бір категорияның өнімдерін алу әдісі
    static getProductsByCategoryId(categoryId, callback) {
        const query = 'SELECT * FROM products WHERE category_id = ?';
        db.query(query, [categoryId], (err, results) => {
            if (err) {
                return callback(err);
            }
            
            callback(null, results);
        });
    }
}

module.exports = Category;
