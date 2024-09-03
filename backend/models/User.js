const db = require('../config/db');

class User {
    static loginUser(userData) {
        const sql = "SELECT id, email, name FROM users WHERE email = ? AND password = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, userData, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static registrUser({name, email, password}){
        const sql = "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";
        return new Promise((resolve, reject)=>{
            db.query(sql, [email, name, password], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    static profile(userId){
        const sql = "SELECT name, email FROM users WHERE id = ?";
        return new Promise((resolve, reject)=>{
            db.query(sql, [userId], (err, results)=>{
                if (err) {
                    return reject(err);
                }
                resolve(results);
            })
        })
        
    }
}

module.exports = User;
