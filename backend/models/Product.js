const db = require('../config/db');

class Product {
    static getAllProducts() {
        const sql = 'SELECT * FROM products';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static getOneProduct(id) {
        const sql = 'SELECT products.*, users.name as user_name FROM products INNER JOIN users ON products.user_id = users.id WHERE products.id = ?;';
        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static getUserGoods(userId){
        const sql = 'SELECT * FROM products WHERE user_id = ?';
        return new Promise((resolve, reject)=>{
            db.query(sql, [userId], (err, results)=>{
                if(err){
                    return reject(err)
                }
                resolve(results)
            })
        })
    }

    static search(name){
        const sql = 'SELECT * FROM products WHERE name LIKE ?'
        return new Promise((resolve, reject) => {
            db.query(sql, [`%${name}%`], (err, results) => {
                if(err){
                    return reject(err);
                }
                resolve(results)
            })
        })

    }

    static saveProduct({ name, price, description, tel, imagePaths, userId, category_id }) {
        const sql = "INSERT INTO products (name, price, description, tel, images, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        
        return new Promise((resolve, reject) => {
            db.query(sql, [name, price, description, tel, JSON.stringify(imagePaths), userId, category_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static updateProduct({ name, price, description, tel, imagePaths, category_id, params, userId }){
        if(imagePaths.length == 0){
            const sql = 'UPDATE products SET name = ?, price = ?, description = ?, tel = ?, category_id = ? WHERE id = ? AND user_id = ?';
            return new Promise((resolve, reject) => {
                db.query(sql, [name, price, description, tel, category_id, params, userId], (err, results) => {
                    if (err) {

                        return reject(err);
                    }

                    resolve(results);
                });
            });
        }else{
            const sql = 'UPDATE products SET name = ?, price = ?, description = ?, images = ?, category_id = ? WHERE id = ? AND user_id = ?';
            return new Promise((resolve, reject) => {
                db.query(sql, [name, price, description, JSON.stringify(imagePaths), category_id, params, userId], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        }
    }
    static deleteProduct(productId){
        const sql = 'DELETE FROM products WHERE id = ? AND user_id = ?';
        return new Promise((resolve, reject) => {
            db.query(sql, productId, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static addFavourite({userId, goodId}){
        const sql = 'INSERT INTO favourites (user_id, product_id) VALUES (?, ?)'
        return new Promise((resolve, reject) => {
            db.query(sql, [userId, goodId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static favourites(ids){
        const sql = 'SELECT id, name, description, images, price FROM products WHERE id IN (?)';
     
        return new Promise((resolve, reject)=>{
            db.query(sql, [ids], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            })
        })
        ;
    }

    static deleteFavourite({params, userId}){
        const sql = 'DELETE FROM favourites WHERE user_id = ? AND product_id = ?'
        return new Promise((resolve, reject) => {
            db.query(sql, [userId, params], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = Product;
