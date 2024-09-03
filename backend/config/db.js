const mysql = require('mysql2');

// MySQL серверінің конфигурациясы
const connection = mysql.createConnection({
    host: 'localhost',        // MySQL серверінің хосты
    user: 'root',     // MySQL қолданушы аты
    password: '', // MySQL қолданушының паролі
    database: 'myshop'    // Сіздің дерекқорыңыздың атауы
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка соединения с MySQL:', err);
        return;
    }
    console.log('MySQL-ге қосылу сәтті!');
});

module.exports = connection;
