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


exports.getOneClient = async (req, res, next) => {
    try {
        const id = req.params.id;

        Client.findOne(id)
            .then((client) => {
                if (client && client && client.length > 0) {
                    res.status(200).json(client);
                } else {
                    res.status(404).json({ message: 'Client non trouvé' });
                }
            })
            .catch((error) => {
                console.error("Error when retrieving the item:", error);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.modifyClient = async (req, res, next) => {
    try {
        const { id, prenom, nom, email, telephone, ville, zipcode, adresse, description } = req.body;
        await Client.updateOne(id, prenom, nom, email, telephone, ville, zipcode, adresse, description)
            .then(() => res.status(200).json({ message: 'Client modifié !' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getDevis = async (req, res, next) => {
    try {
      const clientId = req.params.id;
      const devisResult = await Client.getDevis(clientId);
  
      if (!devisResult || devisResult.length === 0) {
        console.log('Aucun devis trouvé');
        return res.status(404).json({ message: 'Aucun devis trouvé' });
      }
  
      res.status(200).json(devisResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };