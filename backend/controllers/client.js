const Client = require('../models/Client');


exports.createClient = async (req, res, next) => {
    try {
        const userId = req.userID;
        const { prenom, nom, email, phone, city, zip_code, adresse, description } = req.body;
        const client = new Client(prenom, nom, email, phone, city, zip_code, adresse, description, userId);
        client.save()
            .then(() => res.status(201).json({ message: 'Client enregistrer' }))
            .catch(error => res.status(401).json({ error }));
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: 'Client non enregistrer' })
    }
}

exports.getAllClient = async (req, res, next) => {
    try {
        Client.find()
            .then(clients => res.status(200).json(clients))
            .catch(error => res.status(401).json({ error }));
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: 'Client non récupérer' })
    }
}
