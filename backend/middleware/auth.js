const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userID = decodedToken.userID.toString();
        if (req.body.userID && req.body.userID !== userID) {
            throw 'User ID non valable';
        } else {
            req.userID = userID;
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error || 'Requete non authentifiée' });
    }
};
