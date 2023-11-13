const User = require('../models/User');

module.exports = (req, res, next) => {
    try {
        User.findById(req.userID)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'Utilisateur non reconnu' });
                }
                if (user[0][0].role == "employe") {
                    next();
                } else {
                    return res.status(401).json({ error: 'Utilisateur n est pas admin' });
                }
            })
            .catch(error => res.status(404).json({ error: error || 'Erreur lors de la recherche du client' }));
    } catch (error) {
        res.status(401).json({ error: error || 'Requete non Autorisé' });
    }
};