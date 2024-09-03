const connection = require('../config/db');

// Тауарларды алу


// const getAllProducts = (req, res) => {
//     connection.query('SELECT * FROM products', (err, results) => {
//         if (err) {
//             console.error('Ошибка выполнения запроса:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//         res.json(results);
//     });
// }

const saveProduct = (req, res) => {
    const { name, price, description, category_id } = req.body;
    const userId = req.userId;
    if (!name || !name.trim() || price == null || price <= 0 || !description || !description.trim()  || !category_id) {
        return res.status(400).json({ success: false, message: 'Некорректные данные' });
    }
    const sql = 'INSERT INTO products (name, price, description, user_id, category_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, price, description, userId, category_id], (err, results)=>{
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        res.json({success:true, message: "Успешно опубликовал"});
    })
  
}
const removeProduct = (req, res) => {
    const params = req.params.goodId
    const userId = req.userId
    const sql = 'DELETE FROM products WHERE id = ? AND user_id = ?';
    connection.query(sql, [params, userId], (err, results)=>{
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(403).json({ success: false, message: 'Продукт не найден или у вас нет прав на удаление' });
        }
        
        res.json({success:true, message: "Успешно удален"});

    })
}
const updateProduct = (req, res) => {
    const params = req.params.goodId
    const userId = req.userId
    const { name, price, description, category_id} = req.body;
    if (!name || !name.trim() || price == null || price <= 0 || !description || !description.trim() || !category_id) {
        return res.status(400).json({ success: false, message: 'Некорректные данные' });
    }
    const listGoods = [name, price, description, category_id, params, userId]
    const sql = 'UPDATE products SET name = ?, price = ?, description = ?, category_id = ? WHERE id = ? AND user_id = ?';
    connection.query(sql, listGoods , (err, results)=>{
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(403).json({ success: false, message: 'Продукт не найден или у вас нет прав на удаление' });
        }
        res.json({success:true, message: "Успешно обновлен"});

    })
}
  
  module.exports =  { getAllProducts,getOneProduct, getCategories,  getProductByCategory, saveProduct, removeProduct, updateProduct};