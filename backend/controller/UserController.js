const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserController {
    static async loginAuth(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Некорректные данные' });
        }

        const SECRET_KEY = "shopatyrau06kz";
        const userData = [email, password];

        try {
            const user = await User.loginUser(userData);

            if (user.length === 0) {
                return res.status(404).send('Не правильный пароль или логин');
            }

            const token = jwt.sign({ user_id: user[0].id }, SECRET_KEY, { expiresIn: '10m' });
            user[0].token = token;

            res.json(user[0]);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    }

    static async registr(req, res){
  
        const {name, email, password} = req.body
        if(name.trim() === '' || email.trim() === '' || password.trim() === ''){
            return res.status(400).json({ success: false, message: 'Не заполнен'});
        }
        try{
            const response = await User.registrUser({name, email, password})
            res.json({message: 'Вы зарегистрован'})
        }catch(err){
                if (err.code === 'ER_DUP_ENTRY') {
                  res.status(400).json({ message: 'Email already exists.' });
                } else {
                  res.status(500).json({ message: 'Internal server error.' });
                }
        }
    }

    static async profile(req, res){
        const userId = req.userId;
        try{
            const userProfile = await User.profile(userId);
            res.json(userProfile[0])
        } catch(err){
            res.status(500).send('Internal Server Error');
        }
    }

    
}

module.exports = UserController;
