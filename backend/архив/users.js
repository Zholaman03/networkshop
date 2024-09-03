const connection = require('../config/db');
const jwt = require('jsonwebtoken');


const saveUser = (req, res) => {
    const { name, price, description, user_id, category_id } = req.body;
    const sql = 'INSERT INTO products (name, price, description, user_id, category_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, price, description, user_id, category_id], (err, results)=>{
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json("Успешно сохранен");
    })
  
}

const loginUser = (req, res) => {
    const {email, password} = req.body;
    const SECRET_KEY = "shopatyrau06kz";
    const sql = "SELECT id, email, name FROM users WHERE email = ? AND password = ?"
    connection.query(sql, [email, password], (err, results)=>{
        if(err){

            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if(results.length == 0){
            res.status(404).send('Не правильный пароль или логин');
            return;
        }
        const token = jwt.sign({user_id: results[0].id}, SECRET_KEY, {expiresIn: 60*10});
        results[0].token = token
        res.json(results[0])
    })
}


const profileUser = (req, res) => {
    const userId = req.userId;
    const sql = "SELECT name, email FROM users WHERE id = ?";
    connection.query(sql, [userId], (err, results)=>{
        if(err){
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(req)
        res.json(results[0])
        })
    }

  
  module.exports =  {saveUser, loginUser, profileUser};