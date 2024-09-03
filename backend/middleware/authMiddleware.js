const jwt = require('jsonwebtoken');
const checkToken = async (requ, res, next)=>{
   
    const authHeader = requ.headers['authorization'];
    const SECRET_KEY = "shopatyrau06kz";
    if (!authHeader) {
        return res.status(401).json({
            error: "Authorization header is missing"
        });
    }

    const authValue = authHeader.split(' ')[1];
    if (!authValue) {
        return res.status(401).json({
            error: "Token is missing"
        });
    }

    jwt.verify(authValue, SECRET_KEY, (error, value) => {
        if (error) {
            return res.status(401).json({ error: "Auth error" });
        } else {
        
            requ.userId = value.user_id;
            next();
        }
    });
}

module.exports = checkToken