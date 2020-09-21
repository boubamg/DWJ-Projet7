const jwt = require('jsonwebtoken');

let tokenKey = "key";

module.exports = (req, res, next) => {
    try {

        // get token 
        let token = req.headers.authorization.split(' ')[1];
        // decode token
        let decodedtoken = jwt.verify(token, tokenKey);
        let userId = decodedtoken.userId;
        // compare body userId with decoded token user id
        if (req.body.userId && req.body.userId !== userId){
            throw 'Invalid user ID';
        } else {
            next()
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}
